#!/usr/bin/env node

/**
 * ENV Generator Script
 * 
 * This script helps generate a .env file from .env.example
 * with interactive prompts for customization.
 * 
 * Usage:
 *   node scripts/generate-env.js
 *   node scripts/generate-env.js --force  # Overwrite existing .env
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ENV_EXAMPLE_PATH = path.join(__dirname, '..', '.env.example');
const ENV_PATH = path.join(__dirname, '..', '.env');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🚀 Vetra UI - Environment Configuration Generator\n');
  console.log('━'.repeat(60));

  // Check if .env already exists
  const forceOverwrite = process.argv.includes('--force');
  if (fs.existsSync(ENV_PATH) && !forceOverwrite) {
    console.log('⚠️  .env file already exists!');
    console.log('   Use --force flag to overwrite: node scripts/generate-env.js --force\n');
    process.exit(0);
  }

  // Check if .env.example exists
  if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
    console.error('❌ .env.example file not found!');
    process.exit(1);
  }

  const answer = await question('\n📝 Generate .env from template? (y/N): ');
  
  if (answer.toLowerCase() !== 'y') {
    console.log('\n👋 Cancelled. No changes made.\n');
    rl.close();
    process.exit(0);
  }

  try {
    // Copy .env.example to .env
    const envContent = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8');
    fs.writeFileSync(ENV_PATH, envContent, 'utf8');
    
    console.log('\n✅ Success!');
    console.log('━'.repeat(60));
    console.log('📄 Created .env file from .env.example');
    console.log('\n📝 Next steps:');
    console.log('   1. Edit .env file with your configuration');
    console.log('   2. Restart your development server');
    console.log('   3. Check validation: node scripts/validate-env.js');
    console.log('\n💡 Tips:');
    console.log('   - All NEXT_PUBLIC_* variables are exposed to the browser');
    console.log('   - Environment variables are validated via Zod schema');
    console.log('   - Invalid configs will fail the build');
    console.log('\n🔗 Documentation:');
    console.log('   https://github.com/kmucdigital/vetra-ui#environment-variables\n');
    
  } catch (error) {
    console.error('\n❌ Error generating .env file:');
    console.error(error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
