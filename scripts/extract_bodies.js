const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '..', 'src', 'data', 'posts.js');
let s = fs.readFileSync(p, 'utf8');
let i = 0;
let outDir = path.resolve(__dirname, '..', 'public', 'posts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

while (true) {
  const idIdx = s.indexOf('id: ', i);
  if (idIdx === -1) break;
  const idEnd = s.indexOf(',', idIdx);
  const idStr = s.slice(idIdx+4, idEnd).trim();
  const id = Number(idStr);
  const bodyKey = s.indexOf('\n    body: `', idEnd);
  if (bodyKey === -1) { i = idEnd; continue; }
  const bodyStart = bodyKey + '\n    body: `'.length;
  let j = bodyStart;
  while (j < s.length) {
    if (s[j] === '`') {
      // check if escaped
      let k = j - 1, backslashes = 0;
      while (k >= bodyStart && s[k] === '\\') { backslashes++; k--; }
      if (backslashes % 2 === 0) break;
    }
    j++;
  }
  const bodyContent = s.slice(bodyStart, j);
  if (id >=1 && id <=5) {
    const target = path.join(outDir, `${id}.md`);
    fs.writeFileSync(target, bodyContent, 'utf8');
    console.log('Wrote', target);
  }
  i = j+1;
}
console.log('Done');
