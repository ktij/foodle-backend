const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore();

async function addItem (req, res) {
    try {
        console.log(req.body);
        var data = JSON.parse(req.body);
        console.log(data);
        message = await firestore.collection('food').doc('food-items-database').set(data);
        res.statusCode=200;
        res.json({"message": message});        
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to add item"});
    }
}
module.exports = {addItem};