const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function getItemByName (req, res) {
    try {
        var name = req.body.name;
        name = name.toUpperCase();

        const snapshot = await firestore.collection('food').get()
        data = snapshot.docs.map(doc => doc.data());

        returnItem = null;

        for (i in data) {
            itemName = data[i].productName;
            if (name == itemName) {
                returnItem = data[i];
            }
        };
        if (returnItem != null) {
            res.statusCode = 200;
            res.json({"data": returnItem})
        } else {
            res.statusCode = 400;
            res.json({"message": "Item not found"})
        }
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to get item"});
    }
}
module.exports = {getItemByName};