const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({'keyFilename': 'credentials.json'});

// async function extractIngredients (req, res) {
const extractIngredients = (req, res) => {
    try {
        const bucketName = req.params.bucketName;
        const fileName = req.params.fileName;

        async function callVisionAI() {
            // try {
                await client.textDetection(`gs://${bucketName}/${fileName}`)
                .then((results) => {
                    if (results[0].error != null) { // if error message is returned
                        res.statusCode=400;
                        res.json({"error": results[0].error.message});
                    } else { // no error
                        if (results[0].textAnnotations.length === 0) { // if text annotations is blank
                            res.statusCode=400;
                            res.json({"error": "No text found"});
                        } else {
                            res.statusCode=200;
                            var text = results[0].textAnnotations[0].description;
                            var find = '\n';
                            var re = new RegExp(find, 'g');
                            text = text.replace(re, ' ');
                            var l = text.split(",");
                            var rl = [];
                            var mainIngredient = "";
                            var temp = NaN;
                            for (i in l) {
                                if (l[i].includes("(") && l[i].includes(")")) {
                                    temp = l[i];
                                } else if (l[i].includes("(")) {
                                    mainIngredient = l[i].split("(")[0];
                                    var secondIngredient = l[i].split("(")[1];
                                    temp = mainIngredient.trim() + " - " + secondIngredient.trim();
                                } else if (l[i].includes(")")) {
                                    var secondIngredient = l[i].split(")")[0];
                                    temp = mainIngredient.trim() + " - " + secondIngredient.trim();
                                    // temp = mainIngredient.concat(" - ", secondIngredient.trim())
                                    mainIngredient = "";
                                } else (temp = l[i]);

                                temp = temp.toUpperCase().replace("INGREDIENTS","").trim();
                                if (temp.split(" ").length <= 5) {
                                    rl.push(temp)
                                }
                            };

                            res.json({"text": rl}); // Further processing required to remove \n and ensure single spaces only
                        }
                    }
                });
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
module.exports = {extractIngredients};