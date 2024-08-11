## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploy
Set `.env` variables following the `.env.example` file.
Site is basically a single page app but I deployed it as a static site so my "Google Sheets as a DB" service doesn't get hit on each page load.
In order to make any changes to the sheet go live the site will need to be rebuilt and deployed.
