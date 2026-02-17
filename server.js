const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;

const proc = spawn('npx', ['mintlify@latest', 'dev', '--port', String(PORT)], {
  stdio: 'inherit',
  shell: true,
});

proc.on('close', (code) => {
  console.log(`Mintlify dev exited with code ${code}`);
  process.exit(code);
});

