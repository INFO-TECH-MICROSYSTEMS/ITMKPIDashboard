import fs from 'fs';
import path from 'path';

const COPYRIGHT_HEADER = `/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

`;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (f.endsWith('.ts') || f.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

let modifiedCount = 0;
walkDir('src', filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Copyright (c) 2026 INFO TECH MICROSYSTEMS')) {
    fs.writeFileSync(filePath, COPYRIGHT_HEADER + content, 'utf8');
    modifiedCount++;
    console.log(`Added copyright to: ${filePath}`);
  }
});

console.log(`Copyright headers successfully added to ${modifiedCount} files.`);
