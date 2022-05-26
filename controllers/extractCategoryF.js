const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({'keyFilename': 'credentials.json'});
// const client = new vision.ImageAnnotatorClient({'keyFilename': 'C:\\Users\\kshit\\Desktop\\git\\foodle-backend\\credentials.json'});

async function extractCategoryF(fileName) {
    bucketName = "foodle";
    // try {
        results = await client.textDetection(`gs://${bucketName}/${fileName}`);
        if (results[0].error != null) { // if error message is returned
            return {"error": results[0].error.message};
        } else { // no error
            if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                // return {"error": "No text found"};
                return "";
            } else {
                var text = results[0].textAnnotations[0].description;
                text = text.toUpperCase();
                var categories = [['BAR'], ['WRAP'], ['MILK'], ['CHEESE','CHEDDAR'], ['BISCUIT','COOKIE'],];

                var cat = '';
                
                for (l in categories) {
                    for (i in categories[l]) {
                        if (text.includes(categories[l][i])) {
                            cat = categories[l][0];
                            break;
                        }
                    }
                }

                return cat; // Further processing required to remove \n and ensure single spaces only
            }
        }
    // } catch (err) {
    //     return {"error":err.message, "message":"Failed to extract text"};
    // };
}
module.exports = {extractCategoryF};
