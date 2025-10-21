const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const licensePath = path.join(process.cwd(), "LICENSE");

// CRITICAL: Expected SHA256 hash of the original LICENSE file
// This hash MUST match the LICENSE file content exactly
// Any modification to the LICENSE file will cause the build to fail
const EXPECTED_LICENSE_HASH =
  "b447d04fdd449c09f990b0fc6a8a1b1cd3a6db61f96d3c0221c9acace0dc9b28";

console.log("\n🔒 LICENSE INTEGRITY CHECK");
console.log("━".repeat(50));

try {
  // Check 1: LICENSE file must exist
  if (!fs.existsSync(licensePath)) {
    console.error("\n❌ FATAL ERROR: LICENSE file missing in project root.");
    console.error("   The LICENSE file is required and cannot be removed.");
    console.error("   Build process terminated.\n");
    process.exit(1);
  }

  // Check 2: LICENSE file must not be empty
  const content = fs.readFileSync(licensePath, "utf8");
  if (content.trim().length === 0) {
    console.error("\n❌ FATAL ERROR: LICENSE file is empty.");
    console.error("   The LICENSE file must contain valid license text.");
    console.error("   Build process terminated.\n");
    process.exit(1);
  }

  // Check 3: LICENSE file must match expected hash (integrity check)
  const currentHash = crypto.createHash("sha256").update(content).digest("hex");

  if (currentHash !== EXPECTED_LICENSE_HASH) {
    console.error("\n❌ FATAL ERROR: LICENSE file has been modified!");
    console.error("   Expected hash: " + EXPECTED_LICENSE_HASH);
    console.error("   Current hash:  " + currentHash);
    console.error("\n   The LICENSE file is protected and cannot be modified.");
    console.error(
      "   Any changes to the license terms are strictly prohibited."
    );
    console.error("   Please restore the original LICENSE file.");
    console.error("   Build process terminated.\n");
    process.exit(1);
  }

  // Check 4: Verify critical license content
  const requiredTerms = [
    "NON-COMMERCIAL PERSONAL USE LICENSE",
    "Sebastian Lui",
    "KMUC Digital",
    "commercial purposes",
    "https://kmuc.online",
  ];

  const missingTerms = requiredTerms.filter((term) => !content.includes(term));
  if (missingTerms.length > 0) {
    console.error("\n❌ FATAL ERROR: LICENSE file is corrupted or invalid.");
    console.error("   Missing required terms:", missingTerms.join(", "));
    console.error("   Build process terminated.\n");
    process.exit(1);
  }

  // All checks passed
  console.log("✅ LICENSE file integrity verified");
  console.log("✅ Hash matches expected value");
  console.log("✅ All required terms present");
  console.log("━".repeat(50));
  console.log("✅ LICENSE CHECK PASSED - Build can proceed\n");

  process.exit(0);
} catch (err) {
  console.error(
    "\n❌ FATAL ERROR: Unexpected error while validating LICENSE:",
    err.message
  );
  console.error("   Build process terminated.\n");
  process.exit(1);
}
