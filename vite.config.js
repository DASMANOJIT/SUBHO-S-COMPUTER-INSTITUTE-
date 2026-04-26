import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleEnquiryPayload } from './api/enquiries.js'

const enquiryApiPlugin = () => ({
  name: 'local-enquiry-api',
  configureServer(server) {
    server.middlewares.use('/api/enquiries', async (req, res, next) => {
      if (req.method !== 'POST') {
        next();
        return;
      }

      try {
        const chunks = [];

        for await (const chunk of req) {
          chunks.push(chunk);
        }

        const rawBody = Buffer.concat(chunks).toString('utf-8');
        const payload = rawBody ? JSON.parse(rawBody) : {};
        const result = await handleEnquiryPayload(payload, process.env, console);

        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body));
      } catch (error) {
        console.error('Local enquiry API failed', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            message: 'Something went wrong while submitting the enquiry.',
          })
        );
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), enquiryApiPlugin()],
  base: '/', // 👈 important for GitHub Pages
})
