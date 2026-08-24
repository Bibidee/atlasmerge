from pathlib import Path

SOURCE = Path(__file__).parents[2] / "contracts" / "atlasmerge.py"

def source(): return SOURCE.read_text(encoding="utf-8")

def test_contract_uses_current_genlayer_public_api():
    assert "@gl.public.write" in source()
    assert "@gl.public.view" in source()
    assert "gl.message.sender_address" in source()
    assert "def __init__(self):" in source()

def test_invariants_are_encoded_in_contract_source():
    code=source()
    assert "feature.version != cluster.base_version" in code
    assert "if proposed_attribute not in ALLOWED_ATTRIBUTES" in code
    assert "ptr.namespace_id == c.layer_id" in code
    assert "ptr.geohash_prefix == c.geohash" in code
    assert "if decision != \"ACCEPT_DELTA\"" in code
    assert "if feature_id not in self.feature_history: return []" in code
    assert "if len(self.vectors)==0: return []" in code
