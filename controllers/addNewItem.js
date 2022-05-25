const {Firestore} = require('@google-cloud/firestore');

const { extractNameF } = require('../controllers/extractNameF');
const { extractIngredientsF } = require('../controllers/extractIngredientsF');
const { extractNutritionF } = require('../controllers/extractNutritionF');
const {extractCategoryF} = require('../controllers/extractCategoryF');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function addNewItem (req, res) {
    try {
        var bucketName = "foodle";
        var docID = req.params.docID;
        var frontImage = req.params.frontImage;
        var ingredientsImage = req.params.ingredientsImage;
        var nutritionImage = req.params.nutritionImage;

        var categories = [
            'biscuits'
        ]; // NEED TO IMPLEMENT

        const parallel = async() => {
            var nameD = extractNameF(frontImage);
            var ingredientsD = extractIngredientsF(ingredientsImage);
            var nutritionD = extractNutritionF(nutritionImage);
            var categoryD = extractCategoryF(frontImage);

            namee = await nameD;
            ingredients = await ingredientsD;
            nutrition = await nutritionD;
            category = await categoryD;

        };

        await parallel();

        var rIngredients = [];
        for (i in ingredients) {rIngredients.push({"name": ingredients[i]})}


        var rec = [{recommendation: "Higher Protein", productID: "9300695008826"}, {recommendation: "Lower Carbs", productID: "9403110062707"}];

        var data = {
            "productName": namee,
            "productBarcode": docID,
            "imageURL": `https://storage.googleapis.com/${bucketName}/${frontImage}`,
            "categories": category,
            "ingredients": rIngredients,
            "nutrition": nutrition,
            "recommendtaions": rec
        };
        message = await firestore.collection('food').doc(docID).set(data);
        res.statusCode=200;
        res.json({"data": data});    
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to add item"});
    }
};
module.exports = {addNewItem};