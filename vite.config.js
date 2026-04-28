import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleEnquiryPayload } from './api/enquiry.js'

const enquiryApiPlugin = () => ({
  name: 'local-enquiry-api',
  configureServer(server) {
    const handleLocalEnquiryRoute = async (req, res, next) => {
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
            message:
              'Something went wrong while submitting your enquiry. Please try again or contact us directly.',
          })
        );
      }
    };

    server.middlewares.use('/api/enquiry', handleLocalEnquiryRoute);
    server.middlewares.use('/api/enquiries', handleLocalEnquiryRoute);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...localEnv };

  return {
    plugins: [react(), enquiryApiPlugin()],
    base: '/', // 👈 important for GitHub Pages
  };
})
