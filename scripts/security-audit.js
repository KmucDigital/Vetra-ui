#!/usr/bin/env node

/**
 * Security Audit Script
 *
 * Performs comprehensive security checks on the project.
 *
 * Usage:
 *   node scripts/security-audit.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("\n🔒 Vetra UI - Security Audit\n");
console.log("━".repeat(60));

let hasErrors = false;

// 1. Check for sensitive files
console.log("\n📁 Checking for sensitive files...");
const sensitivePatterns = [
  ".env",
  ".env.local",
  ".env.production",
  "id_rsa",
  "id_dsa",
  "*.pem",
  "*.key",
  "*.p12",
  "*.pfx",
];

const gitignorePath = path.join(__dirname, "..", ".gitignore");
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, "utf8");
  const missingPatterns = sensitivePatterns.filter(
    (p) => !gitignore.includes(p.replace("*", ""))
  );

  if (missingPatterns.length > 0) {
    console.log("⚠️  Warning: Some sensitive patterns not in .gitignore:");
    missingPatterns.forEach((p) => console.log(`   - ${p}`));
  } else {
    console.log("✅ All sensitive file patterns are in .gitignore");
  }
}

// 2. Check dependencies for vulnerabilities
console.log("\n📦 Checking dependencies for vulnerabilities...");
try {
  execSync("pnpm audit --audit-level=moderate", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
  console.log("✅ No moderate or higher vulnerabilities found");
} catch (error) {
  console.log("⚠️  Vulnerabilities found. Run `pnpm audit` for details.");
  hasErrors = true;
}

// 3. Check for hardcoded secrets
console.log("\n🔍 Checking for hardcoded secrets...");
const secretPatterns = [
  /api[_-]?key\s*=\s*['"][^'"]+['"]/gi,
  /secret[_-]?key\s*=\s*['"][^'"]+['"]/gi,
  /password\s*=\s*['"][^'"]+['"]/gi,
  /token\s*=\s*['"][^'"]+['"]/gi,
  /bearer\s+[a-zA-Z0-9_-]+/gi,
];

const filesToCheck = ["lib/siteConfig.ts", "app/layout.tsx", "app/page.tsx"];

let secretsFound = false;
filesToCheck.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    secretPatterns.forEach((pattern) => {
      if (pattern.test(content)) {
        console.log(`⚠️  Possible secret found in ${file}`);
        secretsFound = true;
        hasErrors = true;
      }
    });
  }
});

if (!secretsFound) {
  console.log("✅ No obvious hardcoded secrets found");
}

// 4. Check nginx security headers
console.log("\n🌐 Checking nginx security headers...");
const nginxPath = path.join(__dirname, "..", "nginx.conf");
if (fs.existsSync(nginxPath)) {
  const nginxConf = fs.readFileSync(nginxPath, "utf8");
  const requiredHeaders = [
    "X-Frame-Options",
    "X-Content-Type-Options",
    "X-XSS-Protection",
    "Content-Security-Policy",
    "Permissions-Policy",
  ];

  const missingHeaders = requiredHeaders.filter((h) => !nginxConf.includes(h));
  if (missingHeaders.length > 0) {
    console.log("⚠️  Missing security headers in nginx.conf:");
    missingHeaders.forEach((h) => console.log(`   - ${h}`));
    hasErrors = true;
  } else {
    console.log("✅ All required security headers present in nginx.conf");
  }
}

// 5. Check for outdated dependencies
console.log("\n📊 Checking for outdated dependencies...");
try {
  const outdated = execSync("pnpm outdated", {
    cwd: path.join(__dirname, ".."),
    encoding: "utf8",
  });
  if (outdated.trim()) {
    console.log("⚠️  Some dependencies are outdated:");
    console.log(outdated);
  }
} catch (error) {
  // pnpm outdated exits with code 1 if outdated packages exist
  console.log(
    "⚠️  Some dependencies are outdated. Run `pnpm outdated` for details."
  );
}

// Summary
console.log("\n📋 Security Audit Summary");
console.log("━".repeat(60));

if (hasErrors) {
  console.log("❌ Security audit found issues that need attention");
  console.log("\n📝 Recommendations:");
  console.log("  1. Review and fix all warnings above");
  console.log("  2. Run `pnpm audit` and update vulnerable packages");
  console.log("  3. Never commit sensitive data to the repository");
  console.log("  4. Use environment variables for all secrets");
  console.log("  5. Regularly update dependencies\n");
  process.exit(1);
} else {
  console.log("✅ Security audit passed!");
  console.log("   No critical issues found.\n");
  process.exit(0);
}
