const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function getItem (req, res) {
    try {
        var docID = req.params.docID;
        var doc = await firestore.collection('food').doc(docID).get();
        if (!doc.exists) {
            res.statusCode=400;
            res.json({"message": "No such document"});
        } else {
            res.statusCode=200;
            res.json({"data": doc.data()});
        }
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to get item"});
    }
}
module.exports = {getItem};