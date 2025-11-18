#!/usr/bin/env node

/**
 * Design Token Validator
 * Checks for hardcoded design values that should use design tokens
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HARDCODED_COLOR_REGEX = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\(|rgba\(/gi;
const HARDCODED_SPACING_REGEX = /:\s*(\d+)px(?![a-z])/gi;
const HARDCODED_RADIUS_REGEX = /border-radius:\s*(\d+)px/gi;

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /dist/,
  /build/,
  /\.git/,
  /tailwind\.config/,
  /\.stories\./,
];

let errors = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Check for hardcoded colors
  const colorMatches = content.match(HARDCODED_COLOR_REGEX);
  if (colorMatches) {
    colorMatches.forEach((match, index) => {
      const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;
      errors.push({
        file: relativePath,
        line: lineNumber,
        type: 'hardcoded-color',
        value: match,
        message: `Hardcoded color found: ${match}. Use design tokens instead.`,
      });
    });
  }
  
  // Check for hardcoded spacing (in CSS, not Tailwind)
  if (filePath.endsWith('.css')) {
    const spacingMatches = [...content.matchAll(HARDCODED_SPACING_REGEX)];
    spacingMatches.forEach((match) => {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      errors.push({
        file: relativePath,
        line: lineNumber,
        type: 'hardcoded-spacing',
        value: match[0],
        message: `Hardcoded spacing found: ${match[0]}. Use Tailwind spacing scale or design tokens.`,
      });
    });
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))) {
        walkDir(filePath);
      }
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
      if (!IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))) {
        checkFile(filePath);
      }
    }
  });
}

console.log('🔍 Validating design tokens...\n');

// Check apps/web and packages/ui
['apps/web/src', 'packages/ui/src'].forEach((dir) => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
});

if (errors.length > 0) {
  console.error(`❌ Found ${errors.length} design token violations:\n`);
  errors.forEach((error) => {
    console.error(`  ${error.file}:${error.line}`);
    console.error(`    ${error.message}\n`);
  });
  process.exit(1);
} else {
  console.log('✅ No design token violations found!');
  process.exit(0);
}

