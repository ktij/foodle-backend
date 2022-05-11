const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function addItem (req, res) {
    try {
        var data = req.body;
        var docID = req.params.docID;
        message = await firestore.collection('food').doc(docID).set(data);
        res.statusCode=200;
        res.json({"message": message});        
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to add item"});
    }
}
module.exports = {addItem};