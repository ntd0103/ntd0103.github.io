const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '..', 'src', 'data', 'posts.js');
let s = fs.readFileSync(p, 'utf8');
let out = '';
let i = 0;
while (true) {
  const idx = s.indexOf('body: `', i);
  if (idx === -1) {
    out += s.slice(i);
    break;
  }
  out += s.slice(i, idx + 7); // include "body: `"
  i = idx + 7;
  // find matching closing backtick (not escaped)
  let j = i;
  while (j < s.length) {
    if (s[j] === '`') {
      // count backslashes before
      let k = j - 1;
      let backslashes = 0;
      while (k >= i && s[k] === '\\') { backslashes++; k--; }
      if (backslashes % 2 === 0) break; // not escaped
    }
    j++;
  }
  if (j >= s.length) {
    // no closing backtick found; append rest and break
    out += s.slice(i);
    break;
  }
  const bodyContent = s.slice(i, j);
  let sanitized = bodyContent
    // replace code fences
    .replace(/```/g, "${'```'}")
    // escape ${ followed by letter/underscore so outer template won't interpolate
    .replace(/\$\{([A-Za-z_])/g, '\\${$1}')
    // escape backticks
    .replace(/`/g, '\\`');
  out += sanitized;
  out += '`';
  i = j + 1;
}
fs.writeFileSync(p, out, 'utf8');
console.log('Sanitization complete:', p);
