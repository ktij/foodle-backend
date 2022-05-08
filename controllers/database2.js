const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore();

// const data = {
//     stringExample: 'Hello, World!',
//     booleanExample: true,
//     numberExample: 3.14159265,
//     dateExample: 'December 10, 1815',
//     arrayExample: [5, true, 'hello'],
//     nullExample: null,
//     objectExample: {
//       a: 5,
//       b: true
//     }
// };

const data = {
    "123456" : 
        {
            "productName": "Tim Tams",
            "imageURL": "gcp.bucket/timtams.png",
            "categories": ["Biscuit"],
            "nutrtition": [
                {
                    "name":"Fat", 
                    "percentage": 35
                },
                {
                    "name":"Sugar", 
                    "percentage": 5
                }
            ],
            "ingredients": [
                {
                    "name":"Milk"
        
                },
                {
                    "name":"Chocolate"
        
                }
            ]
        }
};

async function addItem (req, res) {
    res = await firestore.collection('food').doc('food-items-database').set(data);
    console.log(res);
}

addItem();