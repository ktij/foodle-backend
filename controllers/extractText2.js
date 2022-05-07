const Tesseract = require('tesseract.js');

Tesseract.recognize(
//   'gs://foodle-backend/timtam.png',
    './tmp/test',
    'eng',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
}).catch((err) => {console.log(err.message)})