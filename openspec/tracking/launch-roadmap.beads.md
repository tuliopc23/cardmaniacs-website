# Launch roadmap — Beads / Linear / OpenSpec index

Canonical machine manifest: [`launch-roadmap.json`](launch-roadmap.json)

OpenSpec change: `reader-first-launch-redesign`

Linear project: [Cardmaniacs Marketing Website](https://linear.app/tulio-cunha-dev/project/cardmaniacs-marketing-website-fcfb1d7677e5/overview)

## Seed commands

```bash
node scripts/seed-launch-roadmap.mjs
```

## Linear sync

**Workspace limit:** Linear returned `USAGE_LIMIT_EXCEEDED` (free active-issue cap). The full ~181-issue tree lives in **Beads + OpenSpec**; do not bulk-create leaves in Linear until the workspace is upgraded or issues are archived.

**What exists in Linear today:** milestone issues for M1 blockers + M8.1 (see project). Nine **project milestones** M0–M8 are created.

**After upgrading Linear:**

```bash
node scripts/linear-sync-from-manifest.mjs
```

**Optional beads push (often fails batch API — prefer script above):**

```bash
node scripts/push-beads-to-linear.mjs --concurrency=8
```

## ID convention

`Mx.y.z` in issue titles — maps to OpenSpec `tasks.md` checkboxes and Linear issues.

## Milestones

| ID  | Title                             | Leaf tasks (approx) |
| --- | --------------------------------- | ------------------- |
| M0  | Source-of-truth alignment         | 6                   |
| M1  | Remove launch-grade embarrassment | 15                  |
| M2  | Reader design system (web)        | 35                  |
| M3  | Homepage product loop             | 14                  |
| M4  | Features encyclopedia             | 32                  |
| M5  | Editorial surfaces                | 9                   |
| M6  | Screenshot asset system           | 14                  |
| M7  | Content hardening                 | 9                   |
| M8  | QA and acceptance                 | 13                  |

**Total tracked issues:** 9 milestone epics + section epics + ~147 leaf tasks (see JSON).

## Dependencies

- M0 blocks M1, M6 (early), M7.8
- M1 blocks launch blockers QA (M8.1–M8.2)
- M2 blocks M3, M4, M5, M6.14
- M3/M4 feed M7 copy pass
- M8 gates launch
