const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '..', 'src', 'data', 'posts.js');
let s = fs.readFileSync(p, 'utf8');
let ids = [1,2,3,4,5];
for (const id of ids) {
  const idStr = `id: ${id},`;
  const idPos = s.indexOf(idStr);
  if (idPos === -1) { console.warn('id not found', id); continue; }
  const bodyKey = s.indexOf('\n    body: `', idPos);
  if (bodyKey === -1) { console.warn('body not found for', id); continue; }
  const bodyStart = bodyKey + '\n    body: `'.length;
  let j = bodyStart;
  while (j < s.length) {
    if (s[j] === '`') {
      // check escaping backslashes
      let k = j-1, backslashes = 0;
      while (k >= bodyStart && s[k] === '\\') { backslashes++; k--; }
      if (backslashes % 2 === 0) break;
    }
    j++;
  }
  if (j >= s.length) { console.warn('no end backtick for', id); continue; }
  // replace from bodyKey+1 to j inclusive
  const before = s.slice(0, bodyKey+1); // include \n before body
  const after = s.slice(j+1);
  const insert = "    body: '',\n    bodyFile: '/posts/"+id+".md',\n";
  s = before + insert + after;
  console.log('Patched id', id);
}
fs.writeFileSync(p, s, 'utf8');
console.log('Wrote', p);
