const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
// const { text } = require('body-parser');

const storage = new Storage();
const client = new vision.ImageAnnotatorClient();

// async function extractText (req, res) {
const extractText = (req, res) => {
    try {
        const bucketName = req.params.bucketName;
        const fileName = req.params.fileName;

        async function callVisionAI() {
            // try {
                await client.textDetection(`gs://${bucketName}/${fileName}`)
                .then((results) => {
                    // const labels = results[0].labelAnnotations;
                    
                    // if ( ("description" in textRes) ) {
                    //     rstring = textRes.description;
                    // } else {
                    //     rstring = "";
                    // }
                    res.json({"text": results});
                    
                });
                // .catch((err) => 
                //     console.error("ERROR: ", err)
                // );
            // } catch (err) {
            //     res.statusCode=400;
            //     res.json({"error":err.message, "message":"Failed to extract text"});
            // };
            
        }
        
        callVisionAI();

    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message":"Failed to extract text"});
    };
}
module.exports = {extractText};