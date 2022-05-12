const {Firestore} = require('@google-cloud/firestore');

const { extractNameF } = require('../controllers/extractNameF');
const { extractIngredientsF } = require('../controllers/extractIngredientsF');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function addNewItem (req, res) {
    try {
        var bucketName = "foodle";
        var docID = req.params.docID;
        var frontImage = req.params.frontImage;
        var ingredientsImage = req.params.ingredientsImage;

        var name = await extractNameF(frontImage);
        var ingredients = await extractIngredientsF(ingredientsImage);
        var rIngredients = [];
        for (i in ingredients) {rIngredients.push({"name": ingredients[i]})}
        var categories = [
            'biscuits'
        ]; // NEED TO IMPLEMENT

        var rec = {
            "productName": "Recommendation",
            "productBarcode": 654321,
            "imageURL": "gcp.bucket/reco.png",
            "categories": [
                "Biscuit"
            ],
            "ingredients": [
                {
                    "name": "Milk"
                },
                {
                    "name": "Chocolate"
                }
            ],
            "nutrition": [
                {
                    "name": "Sugar",
                    "percentage": 5
                },
                {
                    "name": "Fat",
                    "percentage": 5
                }
            ]
        };
        var data = {
            "productName": name,
            "productBarcode": docID,
            "imageURL": `gs://${bucketName}/${frontImage}`,
            "categories": categories,
            "ingredients": rIngredients,
            "nutrition": [
                {
                    "name": "Sugar",
                    "percentage": 5
                },
                {
                    "name": "Fat",
                    "percentage": 5
                }
            ],
            "recommendations": [
                rec,
                rec
            ]
        };
        message = await firestore.collection('food').doc(docID).set(data);
        res.statusCode=200;
        res.json({"data": data});    
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to add item"});
    }
}
module.exports = {addNewItem};