import os
from pathlib import Path

import pytest
from gltest.direct import VMContext, create_address, deploy_contract

pytestmark = pytest.mark.skipif(os.name == "nt", reason="gltest Direct Mode loader cannot unlink its active stdin temp file on Windows; CI runs this suite on Linux")


CONTRACT = Path(__file__).parents[2] / "contracts" / "atlasmerge.py"
ZERO = "sha256:" + "0" * 64


@pytest.fixture()
def deployed():
    vm = VMContext()
    steward = create_address("steward")
    reporter = create_address("reporter")
    vm.sender = steward
    with vm.activate():
        contract = deploy_contract(CONTRACT, vm)
        yield vm, contract, steward, reporter


def create_layer(contract):
    return contract.create_layer("Paris pilot", "https://example.com/charter", ZERO, {"minLat": "48", "maxLat": "49"})


def test_layer_feature_authorization_normalization_and_duplicate_protection(deployed):
    vm, contract, steward, reporter = deployed
    assert create_layer(contract) == 1
    with vm.prank(reporter), vm.expect_revert("only the layer steward"):
        contract.register_feature(1, "tower", {"status": "open"}, ZERO)
    assert contract.register_feature(1, "tower", {"status": "open"}, ZERO) == 1
    assert contract.get_feature(1).attrs_json == '{"status": "OPEN"}'
    with vm.expect_revert("feature key already exists"):
        contract.register_feature(1, "tower", {"status": "OPEN"}, ZERO)


def test_submission_validation_cross_layer_and_cancellation_permissions(deployed):
    vm, contract, steward, reporter = deployed
    create_layer(contract)
    contract.register_feature(1, "tower", {"status": "OPEN"}, ZERO)
    with vm.expect_revert("feature does not belong to layer"):
        contract.submit_cluster(2, 1, "status", "CLOSED", "https://example.com/evidence", ZERO, "u09tun")
    with vm.expect_revert("direct HTTPS"):
        contract.submit_cluster(1, 1, "status", "CLOSED", "http://example.com/evidence", ZERO, "u09tun")
    with vm.prank(reporter):
        assert contract.submit_cluster(1, 1, "status", "closed", "https://example.com/evidence", ZERO, "u09tun") == 1
    with vm.prank(create_address("third")), vm.expect_revert("only submitter or steward"):
        contract.cancel_cluster(1)
    with vm.prank(reporter):
        contract.cancel_cluster(1)
    assert contract.get_cluster(1).status == 4


def test_accept_envelope_requires_exact_match_and_supported_evidence(deployed):
    _, contract, _, _ = deployed
    create_layer(contract)
    contract.register_feature(1, "tower", {"status": "OPEN"}, ZERO)
    contract.submit_cluster(1, 1, "status", "CLOSED", "https://example.com/evidence", ZERO, "u09tun")
    cluster = contract.get_cluster(1)
    base = {"decision": "ACCEPT_DELTA", "attribute": "status", "value": "CLOSED", "source_accessible": True, "feature_match": "MATCH", "support": "SUPPORTED", "reason_code": "DIRECT_SUPPORT", "memory_ids": []}
    assert contract._validate_envelope(__import__("json").dumps(base), cluster, [])["decision"] == "ACCEPT_DELTA"
    for field, value in (("feature_match", "MISMATCH"), ("feature_match", "UNCLEAR"), ("source_accessible", False), ("support", "INSUFFICIENT")):
        bad = dict(base); bad[field] = value
        with pytest.raises(Exception):
            contract._validate_envelope(__import__("json").dumps(bad), cluster, [])
    bad_reason = dict(base); bad_reason["reason_code"] = "INSUFFICIENT_SUPPORT"
    with pytest.raises(Exception):
        contract._validate_envelope(__import__("json").dumps(bad_reason), cluster, [])


def test_pagination_views_return_authoritative_ids(deployed):
    _, contract, _, _ = deployed
    create_layer(contract)
    contract.register_feature(1, "tower", {"status": "OPEN"}, ZERO)
    contract.submit_cluster(1, 1, "status", "CLOSED", "https://example.com/evidence", ZERO, "u09tun")
    assert contract.get_layer_ids(0, 32) == [1]
    assert contract.get_layer_feature_ids(1, 0, 32) == [1]
    assert contract.get_cluster_ids(0, 32) == [1]
