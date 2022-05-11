const {Firestore} = require('@google-cloud/firestore');

const { addItem } = require('../controllers/addItem');
const { extractName } = require('../controllers/extractName');
const { extractIngredients } = require('../controllers/extractIngredients');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function addNewItem (req, res) {
    try {
        // var docID = req.params.docID;
        // var bucketName = req.params.bucketName;
        // var frontImage = req.params.frontImage;
        // var ingredientsImage = req.params.ingredientsImage;
        // itemName = await extractName({params:{bucketName:bucketName, frontImage:frontImage}});
        var rec = {
            "productName": "smth else",
            "productBarcode": 123456,
            "imageURL": "gcp.bucket/timtams.png",
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
            "productName": "Tim Tams",
            "productBarcode": 123456,
            "imageURL": "gcp.bucket/timtams.png",
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
            ],
            "recommendations": [
                rec,
                rec
            ]
        };
        res.statusCode=200;
        res.json({"data": data});    
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to add item"});
    }
}
module.exports = {addNewItem};