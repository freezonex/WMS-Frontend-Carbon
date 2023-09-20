# Carbon Tutorial for NextJS 13

This tutorial will guide you in creating a NextJS app with the [Carbon Design System](https://www.carbondesignsystem.com/). We’ll teach you the ins and outs of using Carbon React components, while introducing web development best practices along the way.

Get started by visiting the [tutorial instructions](https://carbondesignsystem.com/developing/next-tutorial/overview/).

## Create NextJS 13 app

```bash
yarn create next-app

✔ What is your project named? … next-base
✔ Would you like to use TypeScript? … *No / Yes
✔ Would you like to use ESLint? … No / *Yes
✔ Would you like to use Tailwind CSS? … *No / Yes
✔ Would you like to use `src/` directory? … No / *Yes
✔ Would you like to use App Router? (recommended) … No / *Yes
✔ Would you like to customize the default import alias? … *No / Yes

cd carbon-tutorial-nextjs
yarn dev
```

Configure paths in `jsconfig.json`

```
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["components/*"],
      "@/app/*": ["app/*"]
   }
  }
}
```
