const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});



async function getItemByName (req, res) {
    // try {
        var name = req.body.name;
        name = name.toUpperCase();
        console.log(name);

        const snapshot = await firestore.collection('food').get()
        data = snapshot.docs.map(doc => doc.data());

        returnItem = NaN;

        for (i in data) {
            itemName = data[i].productName;
            console.log(itemName);
            if (name == itemName) {
                returnItem = data[i];
            }
        };
        if (returnItem != NaN) {
            res.status = 200;
            res.json({"data": returnItem})
        } else {
            res.status = 400;
            res.json({"message": "Item not found"})
        }
        // res.status = 400;
        // res.json({"message": "Item not found"});
    // } catch (err) {
    //     res.statusCode=400;
    //     res.json({"error":err.message, "message": "Failed to get item"});
    // }
    
    // try {
    //     var docID = req.params.docID;
    //     var doc = await firestore.collection('food').doc(docID).get();
    //     if (!doc.exists) {
    //         res.statusCode=400;
    //         res.json({"message": "No such document"});
    //     } else {
    //         res.statusCode=200;
    //         res.json({"data": doc.data()});
    //     }
    // } catch (err) {
    //     res.statusCode=400;
    //     res.json({"error":err.message, "message": "Failed to add item"});
    // }
}
module.exports = {getItemByName};