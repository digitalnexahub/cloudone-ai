const { spawn } = require('child_process');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 3000;
const MINT_PORT = process.env.MINT_PORT || 4000;

const app = express();

const proc = spawn('npx', ['mintlify@latest', 'dev', '--port', String(MINT_PORT)], {
  stdio: 'inherit',
  shell: true,
});

app.use(
  '/',
  createProxyMiddleware({
    target: `http://127.0.0.1:${MINT_PORT}`,
    changeOrigin: true,
    ws: true,
    logLevel: 'silent',
  })
);

app.listen(PORT, () => {
  console.log(`Express proxy listening on port ${PORT}, forwarding to ${MINT_PORT}`);
});

proc.on('close', (code) => {
  console.log(`Mintlify dev exited with code ${code}`);
});
