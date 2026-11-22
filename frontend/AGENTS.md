<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Struktur folder

Semua path relatif terhadap `frontend/`; proyek ini tidak memakai `src/`.

```
app/          # Routing saja: (public), (auth), (app), admin, dev/design-system
features/     # auth, category, material, request, favorite, report, review, need,
              # notification, profile, matching, scanner, map, impact, admin
components/   # ui/ dan layout/
lib/          # api/, auth/, utils/, constants/
hooks/        # Hook generik
mocks/        # handlers/, fixtures/, db.ts, browser.ts, server.ts
e2e/          # Tes Playwright
```

Setiap fitur mandiri memiliki `components/`, `hooks/`, `api/`, `schemas/`, `types.ts`,
`constants.ts`, dan `index.ts`. Folder `features/admin/` memiliki subfolder `reports/`,
`listings/`, `categories/`, dan `users/`. `lib/api/schema.d.ts` adalah keluaran generator
OpenAPI dan tidak boleh diedit manual.

## Aturan arsitektur

- `app/` hanya merakit halaman, tanpa logika bisnis atau panggilan API langsung.
- Fitur tidak boleh mengimpor isi internal fitur lain. Gunakan hanya public API
  `@/features/<nama>` (`index.ts`) untuk impor lintas fitur.
- Kode yang dipakai dua fitur atau lebih dipindahkan ke `components/ui`, `lib`, atau `hooks`.
- `components/ui` tidak boleh mengimpor apa pun dari `features`.
- Pembatasan impor ini ditegakkan oleh `no-restricted-imports` di ESLint.

## Design system

Tailwind v4 memakai token `@theme` dalam `app/globals.css`: primary hijau, accent amber,
dan neutral slate. Gunakan token semantik (`background`, `surface`, `border`, `text`,
`text-muted`, `primary`, `primary-hover`, `primary-soft`, `focus-ring`) alih-alih hex dalam
komponen. Antarmuka hanya mode terang, warna datar tanpa gradien, font Inter, grid ruang 8 px,
radius kontrol 8 px/kartu 12 px, bayangan kartu `sm`, target sentuh minimum 44 px, fokus terlihat,
dan menghormati `prefers-reduced-motion`.
