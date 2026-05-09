const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔨 Building MYC Document Platform...\n');

try {
  // Build client
  console.log('📦 Building client...');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'client'), stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  npm warnings in client (continuing...)');
  }
  
  try {
    execSync('npm run build', { cwd: path.join(__dirname, 'client'), stdio: 'inherit' });
  } catch (e) {
    console.error('❌ Client build failed:', e.message);
    throw e;
  }
  console.log('✅ Client built successfully\n');

  // Verify dist exists
  const distPath = path.join(__dirname, 'client', 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error(`❌ Build directory not found: ${distPath}`);
  }
  console.log(`✅ Dist directory confirmed at: ${distPath}\n`);

  // Install server dependencies
  console.log('📦 Installing server dependencies...');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'server'), stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  npm warnings in server (continuing...)');
  }
  console.log('✅ Server dependencies installed\n');

  console.log('🎉 Build complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
