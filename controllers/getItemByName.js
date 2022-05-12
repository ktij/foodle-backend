const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

// const snapshot = await firebase.firestore().collection('events').get()
// return snapshot.docs.map(doc => doc.data());

async function getItemByName (req, res) {
    // try {
    //     var docID = req.params.name;
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
}
module.exports = {getItemByName};