#!/bin/bash
# SECURITY VERIFICATION SCRIPT
# Run this to verify all security fixes are in place

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     OFFICIAL PORTFOLIO SECURITY VERIFICATION SCRIPT        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

verify_count=0
passed_count=0

check_item() {
  local name=$1
  local command=$2
  local should_exist=$3
  
  echo -n "[$((verify_count+1))] Checking: $name... "
  
  if eval "$command" &> /dev/null; then
    if [ "$should_exist" = "true" ]; then
      echo -e "${GREEN}✅ PASS${NC}"
      ((passed_count++))
    else
      echo -e "${RED}❌ FAIL${NC} (Should NOT exist)"
    fi
  else
    if [ "$should_exist" = "false" ]; then
      echo -e "${GREEN}✅ PASS${NC}"
      ((passed_count++))
    else
      echo -e "${RED}❌ FAIL${NC} (Not found)"
    fi
  fi
  ((verify_count++))
}

echo "📋 FILE EXISTENCE CHECKS:"
echo "────────────────────────────────────────────────────────────"

check_item "security-utils.js exists" "test -f security-utils.js" true
check_item ".env.example exists" "test -f .env.example" true
check_item ".gitignore exists" "test -f .gitignore" true
check_item "SECURITY_AUDIT.md exists" "test -f SECURITY_AUDIT.md" true
check_item "SECURITY_QUICK_REFERENCE.md exists" "test -f SECURITY_QUICK_REFERENCE.md" true

echo ""
echo "🛡️  SECURITY CONFIGURATION CHECKS:"
echo "────────────────────────────────────────────────────────────"

check_item ".env file NOT committed" "git ls-files | grep -q '^\.env$'" false
check_item ".env in .gitignore" "grep -q '^\\.env' .gitignore" true
check_item ".env.local in .gitignore" "grep -q '^\\.env\\.local' .gitignore" true

echo ""
echo "🔐 CREDENTIAL CHECKS:"
echo "────────────────────────────────────────────────────────────"

check_item "No exposed MongoDB URI" "grep -r 'mongodb+srv://.*:.*@' --exclude-dir=node_modules ." false
check_item "No exposed JWT secrets" "grep -r 'jwt.*secret.*=' --exclude-dir=node_modules . | grep -v '.example' | grep -v 'AUDIT' | grep -v 'REFERENCE'" false
check_item "No exposed AWS keys" "grep -r 'aws.*access.*key.*=' --exclude-dir=node_modules . | grep -v '.example' | grep -v 'AUDIT'" false

echo ""
echo "🚫 DANGEROUS CODE PATTERNS:"
echo "────────────────────────────────────────────────────────────"

check_item "No unsafe innerHTML" "grep -r '\\.innerHTML\\s*=' --include='*.html' --include='*.js' . | grep -v 'security-utils' | grep -v '.min.js' | wc -l | grep -q '^0$'" true
check_item "No dangerous eval()" "grep -r 'eval(' --include='*.js' . | grep -v 'node_modules' | wc -l | grep -q '^0$'" true
check_item "No dangerous Function()" "grep -r 'new Function(' --include='*.js' . | grep -v 'node_modules' | wc -l | grep -q '^0$'" true

echo ""
echo "📦 SECURITY UTILITIES:"
echo "────────────────────────────────────────────────────────────"

check_item "escapeHTML() function exists" "grep -q 'function escapeHTML' security-utils.js" true
check_item "sanitizeHTML() function exists" "grep -q 'function sanitizeHTML' security-utils.js" true
check_item "validateURL() function exists" "grep -q 'function validateURL' security-utils.js" true
check_item "createSafeElement() function exists" "grep -q 'function createSafeElement' security-utils.js" true

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
printf "║ RESULTS: %d/%d CHECKS PASSED\n" $passed_count $verify_count
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

if [ $passed_count -eq $verify_count ]; then
  echo -e "${GREEN}✅ ALL SECURITY CHECKS PASSED!${NC}"
  echo ""
  echo "🎉 Your portfolio is security hardened!"
  echo ""
  echo "📝 NEXT STEPS:"
  echo "  1. Rotate MongoDB password in MongoDB Atlas"
  echo "  2. Copy .env.example to .env"
  echo "  3. Add your real credentials to .env"
  echo "  4. Verify .env is in .gitignore"
  echo "  5. Test XSS prevention (see SECURITY_QUICK_REFERENCE.md)"
  exit 0
else
  echo -e "${RED}❌ SOME CHECKS FAILED${NC}"
  echo ""
  echo "⚠️  Please review SECURITY_AUDIT.md for details"
  echo "   and run fixes accordingly."
  exit 1
fi
