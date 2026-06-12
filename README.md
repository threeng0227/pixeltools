# PixelTools — Fast, Private, All-in-One Image Toolkit

> Compress, resize, crop, convert and enhance images directly in your browser. Your images never leave your device.

## Features

- **Compress Image** — Quality presets + custom slider
- **Resize Image** — Custom dimensions + social media presets (Instagram, Facebook, Twitter/X, YouTube)
- **Crop Image** — Free crop + aspect ratios (1:1, 4:3, 16:9, 9:16)
- **Convert Image** — JPG ↔ PNG ↔ WebP
- **Rotate Image** — 90°/180°/270° or custom angle
- **Flip Image** — Horizontal, vertical, or both
- **Watermark Image** — Text with font size, opacity, color, and position controls
- **100% Browser-Based** — No server upload, no account required

## Tech Stack

- **Framework**: Next.js 16 App Router + TypeScript
- **UI**: Tailwind CSS v4 + shadcn/ui + Framer Motion
- **State**: Zustand | **Forms**: React Hook Form + Zod
- **Image**: browser-image-compression, react-easy-crop, Canvas API

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

See `.env.example`. All analytics and AdSense variables are optional — ads and tracking are automatically disabled when IDs are empty.

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com
3. Add env vars in Vercel dashboard
4. Deploy

## Project Structure

```
src/
├── app/          # Pages (all tool routes + about/contact/legal)
├── components/   # ads/, layout/, shared/
├── constants/    # tools list, site config
├── features/     # per-tool interactive components
├── lib/          # image-utils.ts, ads.ts
├── stores/       # Zustand
└── types/
```
# pixeltools
