const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({'keyFilename': 'credentials.json'});

// async function extractText (req, res) {
async function extractNameF(fileName) {
    bucketName = 'foodle';
    try {
        results = await client.textDetection(`gs://${bucketName}/${fileName}`)
        if (results[0].error != null) { // if error message is returned
            return {"error": results[0].error.message};
        } else { // no error
            if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                return {"error": "No text found"};
            } else {
                var arrText = [];
                var arrArea = [];
                // var arrXdistance = [];
                // var arrYdistance = [];
                textAnnotations = results[0].textAnnotations
                for (item in textAnnotations) {
                    text = textAnnotations[item].description;
                    boundingPoly = textAnnotations[item].boundingPoly.vertices;
                    xdistance = boundingPoly[1].x - boundingPoly[0].x;
                    ydistance = boundingPoly[2].y - boundingPoly[1].y;
                    area = xdistance * ydistance;
                    arrText.push(text);
                    arrArea.push(area);
                    // arrXdistance.push(xdistance);
                    // arrYdistance.push(ydistance);
                };
                narr = arrArea.slice(1, arrArea.length);
                var item = Math.max.apply(Math, narr);
                var index = narr.indexOf(item);
                var text = arrText[index+1];
                text = text.replace(/\n/g, ' ');
                return text.toUpperCase(); // Further processing required to remove \n and ensure single spaces only
            }
        }  
    } catch (err) {
        return {"error":err.message, "message":"Failed to extract text"};
    };
}
module.exports = {extractNameF};