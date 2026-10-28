# Calculator App

A basic four-function calculator built with Next.js, React, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Arithmetic**: add, subtract, multiply, divide, with chained operations. Dividing by zero returns 0.
- **Editing**: clear (`C`), toggle sign (`+/-`), backspace, and decimals.
- **Keyboard input**: digits, `.`, `+ - * /`, `Enter` or `=` to evaluate, `Backspace` to delete, `Escape` or `C` to clear.

The calculator lives in [`src/components/Calculator.tsx`](src/components/Calculator.tsx) and is
rendered by [`src/app/page.tsx`](src/app/page.tsx).

## Development

```bash
npm run lint
npm run build
```

The project was bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load
[Geist](https://vercel.com/font). See the [Next.js docs](https://nextjs.org/docs) and the
[deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more.
