const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({'keyFilename': 'credentials.json'});
// const client = new vision.ImageAnnotatorClient({'keyFilename': 'C:\\Users\\kshit\\Desktop\\git\\foodle-backend\\credentials.json'});

async function extractIngredientsF(fileName) {
    bucketName = "foodle";
    try {
        results = await client.textDetection(`gs://${bucketName}/${fileName}`);
        if (results[0].error != null) { // if error message is returned
            return {"error": results[0].error.message};
        } else { // no error
            if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                // return {"error": "No text found"};
                return "";
            } else {
                var text = results[0].textAnnotations[0].description;
                text = text.replace(RegExp('\n', 'g'), ' ');
                text = text.replace(/[().\[\]]/g, ',');
                var l = text.split(',');
                var rl = [];
                var temp = NaN;
                for (i in l) {
                    temp = l[i];
                    if ( (/\d/.test(temp)) == false ) {
                        temp = temp.toUpperCase().replace("INGREDIENTS","").trim();
                        if (temp.split(" ").length <= 5 && temp != "") {
                            rl.push(temp)
                        }
                    }
                };
                return rl; // Further processing required to remove \n and ensure single spaces only
            }
        }
    } catch (err) {
        return {"error":err.message, "message":"Failed to extract text"};
    };
}
module.exports = {extractIngredientsF};