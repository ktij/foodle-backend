const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

const storage = new Storage();
const client = new vision.ImageAnnotatorClient();

// async function extractText (req, res) {
const extractText = (req, res) => {
    try {
        const bucketName = req.params.bucketName;
        const fileName = req.params.fileName;

        async function callVisionAI() {
            try {
                await client.textDetection(`gs://${bucketName}/${fileName}`)
                .then((results) => {
                    if (results[0].error != null) { // if error message is returned
                        res.statusCode=400;
                        res.json({"error": results[0].error.message});
                    } else { // no error
                        if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                            res.statusCode=200;
                            res.json({"text": ""});
                        } else {
                            res.statusCode=200;
                            res.json({"text": results[0].textAnnotations[0].description});
                        }
                    }
                });
            } catch (err) {
                res.statusCode=400;
                res.json({"error":err.message, "message":"Failed to extract text"});
            };
            
        }
        
        callVisionAI();

    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message":"Failed to extract text"});
    };
}
module.exports = {extractText};