import fs from 'fs';
import path from 'path';

const docsDir = 'docs';
const docsFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

// Update each doc inside docs/
docsFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any reference to ../USER_GUIDE.md with user_guide.md
  content = content.replace(/\.\.\/USER_GUIDE\.md/g, 'user_guide.md');
  content = content.replace(/USER_GUIDE\.md/g, 'user_guide.md');
  
  // Replace any reference to ../DEPLOYMENT.md with deployment_guide.md
  content = content.replace(/\.\.\/DEPLOYMENT\.md/g, 'deployment_guide.md');
  content = content.replace(/DEPLOYMENT\.md/g, 'deployment_guide.md');

  // Ensure link to main README is ../README.md
  content = content.replace(/\[← Back to Main README\]\((?!(\.\.\/README\.md))[^)]+\)/g, '[← Back to Main README](../README.md)');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated links in docs/${file}`);
});

// Update root README.md
let readme = fs.readFileSync('README.md', 'utf8');
readme = readme.replace(/\(USER_GUIDE\.md\)/g, '(docs/user_guide.md)');
readme = readme.replace(/\(DEPLOYMENT\.md\)/g, '(docs/deployment_guide.md)');
fs.writeFileSync('README.md', readme, 'utf8');
console.log('Updated links in root README.md');

// Verify all links in docs/ and README.md
console.log('\n--- Link Integrity Audit ---');
const allDocs = ['README.md', ...docsFiles.map(f => path.join('docs', f))];

let brokenLinks = 0;
allDocs.forEach(docPath => {
  const content = fs.readFileSync(docPath, 'utf8');
  const dir = path.dirname(docPath);
  const regex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const linkText = match[1];
    const target = match[2];
    const resolved = path.resolve(dir, target);
    if (!fs.existsSync(resolved)) {
      console.error(`BROKEN LINK in ${docPath}: [${linkText}](${target}) -> ${resolved} does not exist`);
      brokenLinks++;
    } else {
      // console.log(`OK: in ${docPath} -> ${target}`);
    }
  }
});

if (brokenLinks === 0) {
  console.log('ALL markdown links across README.md and docs/*.md are 100% VALID and RESOLVE CLEANLY!');
} else {
  console.error(`Found ${brokenLinks} broken links!`);
}
