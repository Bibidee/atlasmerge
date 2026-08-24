# AtlasMerge

A consensus merge layer for crowdsourced maps. AtlasMerge has two deployable layers only: this Next.js frontend and the StudioNet Intelligent Contract in `contracts/atlasmerge.py`.

## Status

Implementation is ready for local frontend verification. No StudioNet contract address or hosted site is claimed until deployment and execution proof are recorded in `handoff.md`.

## Run

```powershell
Copy-Item .env.example .env.local
npm install --prefix apps/web
npm run dev
```

Run checks with `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`. Configure `NEXT_PUBLIC_ATLASMERGE_CONTRACT` only after a successful StudioNet deployment. The UI deliberately displays an unavailable state without it.
