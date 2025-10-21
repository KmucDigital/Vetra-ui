#!/usr/bin/env node

/**
 * ENV Validation Script
 * 
 * This script validates environment variables against the Zod schema
 * to ensure all required variables are properly configured.
 * 
 * Usage:
 *   pnpm env:validate
 */

const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

console.log('\n🔍 Vetra UI - Environment Validation\n');
console.log('━'.repeat(60));

async function main() {
  try {
    // Dynamically import the .env.schema module using tsx
    const { execSync } = require('child_process');
    
    // Use tsx to run the validation
    const schemaPath = path.join(__dirname, '..', '.env.schema.ts');
    const result = execSync(`npx tsx -e "
      const { validateEnv } = require('${schemaPath.replace(/\\/g, '\\\\')}');
      const env = validateEnv();
      console.log(JSON.stringify(env));
    "`, { encoding: 'utf-8' });
    
    const env = JSON.parse(result);
    
    console.log('✅ Environment validation successful!\n');
    console.log('📊 Validated Variables:');
    console.log('━'.repeat(60));
    
    // Show validated non-sensitive variables
    const publicVars = Object.entries(env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .sort();
    
    publicVars.forEach(([key, value]) => {
      const displayValue = typeof value === 'string' && value.length > 50 
        ? value.substring(0, 47) + '...'
        : value;
      console.log(`  ${key}: ${displayValue}`);
    });
    
    console.log('\n🎯 Configuration Summary:');
    console.log('━'.repeat(60));
    console.log(`  Environment: ${env.NODE_ENV}`);
    console.log(`  Site Name: ${env.NEXT_PUBLIC_SITE_NAME}`);
    console.log(`  Site URL: ${env.NEXT_PUBLIC_SITE_URL}`);
    console.log(`  Analytics: ${env.NEXT_PUBLIC_ENABLE_ANALYTICS ? 'Enabled' : 'Disabled'}`);
    console.log(`  Contact Form: ${env.NEXT_PUBLIC_ENABLE_CONTACT_FORM ? 'Enabled' : 'Disabled'}`);
    console.log(`  i18n: ${env.NEXT_PUBLIC_ENABLE_I18N ? 'Enabled' : 'Disabled'}`);
    
    console.log('\n✅ All environment variables are valid!');
    console.log('   You can now run: pnpm dev or pnpm build\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Environment validation failed!\n');
    console.error(error.message);
    
    console.log('\n📝 Next steps:');
    console.log('  1. Check your .env file for missing or invalid variables');
    console.log('  2. Refer to .env.example for correct format');
    console.log('  3. Run: pnpm env:generate to regenerate\n');
    
    process.exit(1);
  }
}

main();
