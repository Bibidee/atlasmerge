# AtlasMerge — Reviewer Request Resolution

## What changed

Pavel Kolosov reported that the Cluster detail page was passing the target feature ID to `preview_related`, even though the deployed contract ABI requires the current cluster ID.

The Cluster detail read path now keeps the two identifiers separate:

- `getCluster(clusterId)` reads the current cluster.
- `getFeature(cluster.feature_id)` reads the cluster's target feature.
- `getHistory(cluster.feature_id)` reads that feature's accepted history.
- `preview_related(clusterId, 8)` retrieves precedents eligible for the current cluster.

The page uses the shared `loadClusterDetail()` reader, so initial loading and post-adjudication refresh use the same corrected behavior. Optional related-memory failures remain isolated and do not prevent authoritative cluster and feature data from rendering.

## Regression coverage

The regression deliberately uses different entity IDs:

- Cluster ID: `7`
- Feature ID: `2`

It proves the exact calls are:

- `getCluster("7")`
- `getFeature("2")`
- `getHistory("2")`
- `related("7")`

This prevents a future refactor from accidentally substituting the feature ID for the cluster ID again.

## Verification

- Frontend: `53/53` tests passed.
- Typecheck: passed.
- Lint: passed.
- Production build: passed.
- Contract static validation: `8/8` passed.
- Contract behavioral Direct Mode: `16/16` passed.
- GitHub Actions run: [32994257878](https://github.com/Bibidee/atlasmerge/actions/runs/32994257878), successful on CI-closure commit `437cd1e56f80de609d02f5e04cb5bc871bdd4504`.
- Production: [https://atlasmerge.vercel.app](https://atlasmerge.vercel.app), HTTP 200 with the final contract address in the public bundle.

## Optional reviewer request

`contracts/atlasmerge.py` was not changed or redeployed. Its SHA-256 remains:

`32ea5e612fc8fdc0cf5e319d21df4ab28868ae0bdc945bb554ab3cc8190c64e8`

The reviewer also requested an optional trust improvement: authenticate or rank evidence sources and bind the layer charter into adjudication. This was explicitly presented as optional and was separate from the required Cluster detail correction completed here.
