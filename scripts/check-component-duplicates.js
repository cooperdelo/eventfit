#!/usr/bin/env node

/**
 * Component Duplicate Checker
 * Scans for duplicate component names and similar implementations
 */

const fs = require('fs');
const path = require('path');

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /dist/,
  /build/,
  /\.git/,
  /\.stories\./,
  /\.test\./,
  /\.spec\./,
];

const componentMap = new Map();
const duplicates = [];
const similarComponents = [];

function extractComponentName(filePath, content) {
  // Extract exported component name
  const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
  const namedExportMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
  
  if (defaultExportMatch) return defaultExportMatch[1];
  if (namedExportMatch) return namedExportMatch[1];
  
  // Fallback: use filename
  return path.basename(filePath, path.extname(filePath));
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Skip if not a component file
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
    return;
  }
  
  // Skip test/story files
  if (IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))) {
    return;
  }
  
  const componentName = extractComponentName(filePath, content);
  
  if (componentMap.has(componentName)) {
    duplicates.push({
      name: componentName,
      files: [componentMap.get(componentName), relativePath],
    });
  } else {
    componentMap.set(componentName, relativePath);
  }
  
  // Check for similar component patterns
  if (content.includes('Button') && !filePath.includes('Button.tsx')) {
    similarComponents.push({
      file: relativePath,
      pattern: 'Button',
      suggestion: 'Use Button from @eventfit/ui',
    });
  }
  
  if (content.includes('Card') && !filePath.includes('Card.tsx') && !filePath.includes('EventCard') && !filePath.includes('OutfitCard')) {
    similarComponents.push({
      file: relativePath,
      pattern: 'Card',
      suggestion: 'Use Card from @eventfit/ui or create feature-specific card',
    });
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))) {
        walkDir(filePath);
      }
    } else {
      checkFile(filePath);
    }
  });
}

console.log('🔍 Checking for duplicate components...\n');

// Check all component directories
['packages/ui/src', 'apps/web/src/components'].forEach((dir) => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
});

let hasErrors = false;

if (duplicates.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${duplicates.length} duplicate component names:\n`);
  duplicates.forEach((dup) => {
    console.error(`  Component: ${dup.name}`);
    console.error(`    Files:`);
    dup.files.forEach((file) => {
      console.error(`      - ${file}`);
    });
    console.error('');
  });
}

if (similarComponents.length > 0) {
  console.warn(`⚠️  Found ${similarComponents.length} potential component duplicates:\n`);
  similarComponents.forEach((item) => {
    console.warn(`  File: ${item.file}`);
    console.warn(`    Pattern: ${item.pattern}`);
    console.warn(`    Suggestion: ${item.suggestion}\n`);
  });
}

if (!hasErrors && similarComponents.length === 0) {
  console.log('✅ No duplicate components found!');
  process.exit(0);
} else if (hasErrors) {
  console.error('\n💡 Fix duplicates by:');
  console.error('  1. Identify the canonical version');
  console.error('  2. Update all imports to use canonical version');
  console.error('  3. Remove duplicate files');
  console.error('  4. Update component registry\n');
  process.exit(1);
} else {
  process.exit(0);
}

