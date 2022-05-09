const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

const storage = new Storage();
const client = new vision.ImageAnnotatorClient();

// async function extractText (req, res) {
const extractName = (req, res) => {
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
                            var arrText = [];
                            var arrArea = [];
                            var arrXdistance = [];
                            var arrYdistance = [];
                            textAnnotations = results[0].textAnnotations
                            for (item in textAnnotations) {
                                text = textAnnotations[item].description;
                                boundingPoly = textAnnotations[item].boundingPoly.vertices;
                                xdistance = boundingPoly[1].x - boundingPoly[0].x;
                                ydistance = boundingPoly[2].y - boundingPoly[1].y;
                                area = xdistance * ydistance;
                                arrText.push(text);
                                arrArea.push(area);
                                arrXdistance.push(xdistance);
                                arrYdistance.push(ydistance);
                            };
                            narr = arrArea.slice(1, arrArea.length);
                            var item = Math.max.apply(Math, narr);
                            var index = narr.indexOf(item);
                            res.statusCode=200;
                            var text = arrText[index+1];
                            var find = '\n';
                            var re = new RegExp(find, 'g');
                            text = text.replace(re, ' ');
                            res.json({"name": text}); // Further processing required to remove \n and ensure single spaces only
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
module.exports = {extractName};