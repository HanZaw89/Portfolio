const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

function g(a, b) { return lines.slice(a-1, b); }

let out = [];
out.push(...g(1, 63));
out.push(...g(88, 111)); // V2
out.push(...g(64, 87)); // V1
out.push(...g(112, 134)); // V3
out.push(...g(135, 137));
out.push(...g(163, 165)); // FB header
out.push(...g(250, 269), '\r'); // V8
out.push(...g(271, 290), '\r'); // V9
out.push(...g(208, 227), '\r'); // V6
out.push(...g(166, 185), '\r'); // V4
out.push(...g(229, 248), '\r'); // V7
out.push(...g(187, 206)); // V5
out.push(...g(291, 292)); // FB end
out.push(...g(138, 162)); // YOUTUBE
out.push(...g(293, 296)); // L&B header
out.push(...g(297, 320)); // V10
out.push(...g(345, 367), '\r'); // V12
out.push(...g(321, 343)); // V11
out.push(...g(368, lines.length)); // End

fs.writeFileSync('index.html', out.join('\n'));
console.log("HTML completely reorganized.");
