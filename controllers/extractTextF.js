const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({'keyFilename': 'credentials.json'});

async function extractTextF(bucketName, fileName) {
    try {
        results = await client.textDetection(`gs://${bucketName}/${fileName}`);
        if (results[0].error != null) { // if error message is returned
            return {"error": results[0].error.message};
        } else { // no error
            if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                return {"error": "No text found"};
            } else {
                var text = results[0].textAnnotations[0].description;
                var find = '\n';
                var re = new RegExp(find, 'g');
                text = text.replace(re, ' ');
                return {"text": text.split("\n")}; // Further processing required to remove \n and ensure single spaces only
            }
        };
    } catch (err) {
        return {"error":err.message, "message":"Failed to extract text"};
    };
}
module.exports = {extractTextF};