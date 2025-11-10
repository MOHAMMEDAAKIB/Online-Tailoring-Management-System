// Check migration files for duplicates and correct order
const fs = require('fs');
const path = require('path');

const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

console.log('🔍 Checking migration files...\n');

// List all SQL files
const files = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

console.log('✅ Found migration files:');
files.forEach((file, index) => {
  const expectedNum = String(index + 1).padStart(3, '0');
  const actualNum = file.substring(0, 3);
  const status = actualNum === expectedNum ? '✅' : '❌';
  console.log(`   ${status} ${file}`);
});

// Check for duplicates
const numbers = files.map(f => f.substring(0, 3));
const duplicates = numbers.filter((num, index) => numbers.indexOf(num) !== index);

if (duplicates.length > 0) {
  console.log('\n❌ Found duplicate numbers:', [...new Set(duplicates)]);
} else {
  console.log('\n✅ No duplicate numbers found');
}

// Check for correct sequence
let hasGaps = false;
for (let i = 0; i < files.length; i++) {
  const expected = String(i + 1).padStart(3, '0');
  const actual = files[i].substring(0, 3);
  if (actual !== expected) {
    console.log(`❌ Gap or skip at position ${i + 1}: expected ${expected}, got ${actual}`);
    hasGaps = true;
  }
}

if (!hasGaps) {
  console.log('✅ All migration numbers are in correct sequence');
}

console.log('\n📋 Migration order:');
files.forEach((file, index) => {
  console.log(`   ${index + 1}. ${file}`);
});

console.log('\n🎉 Migration files check complete!');
