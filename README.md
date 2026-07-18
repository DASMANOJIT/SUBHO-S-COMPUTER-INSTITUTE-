# Subho's Computer Institute

## Development

- `npm run dev`
  Runs the Vite frontend on `http://localhost:5173`.

If you change `.env` or `.env.local`, restart the development server before testing again.

## Book Order Submission

The Book Order form submits directly from the browser to the deployed Google Apps Script Web App URL configured in `VITE_GOOGLE_APPS_SCRIPT_WEB_APP_URL`.
Keep that value blank in local development until you are ready to test against a real Apps Script deployment.
