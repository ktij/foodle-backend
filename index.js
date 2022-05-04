var express = require('express');
var app = express();
var fs = require("fs");
const {Storage} = require('@google-cloud/storage');

const {promisify} = require('util');
const path = require('path');

const storage = new Storage();

app.get('/get-bucket-items', function (req, res) {
    // The ID of your GCS bucket
    var bucketName = req.query.bucketName;
    
    async function listFiles() {
        // Lists files in the bucket
        const [files] = await storage.bucket(bucketName).getFiles();
        
        console.log('Files:');
        files.forEach(file => {
            console.log(file.name);
        });
        
        res.send('{key:value}');
    }

    listFiles().catch(console.error);
})

app.get('/download-bucket-image', function (req, res) {
    var bucketName = req.query.bucketName;
    var fileName = req.query.fileName;
    
    const file = storage.bucket(bucketName).file("test");
    // const filePath = `gs://${bucketName}/${fileName}`;

    // Download file from bucket.
    async function downloadFile() {
        try {
            await file.download({destination: "./tmp/test"});
            console.log(`Downloaded ${file.name} to ${"./tmp/test"}.`);
        } catch (err) {
            throw new Error(`File download failed: ${err}`);
        }
    };

    downloadFile();

    // // Delete the temporary file.
    // const unlink = promisify(fs.unlink);
    // unlink(tempLocalPath);
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    // console.log("Example app listening at http://%s:%s", host, port)
})




// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient();

