var express = require('express');
var app = express();
var fs = require("fs");
const {Storage} = require('@google-cloud/storage');
const {google} = require('googleapis');

const {promisify} = require('util');
const path = require('path');

const auth = new google.auth.GoogleAuth({
    keyFile: '/credentials.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

const storage = new Storage({keyFilename: "credentials.json"});

app.get('/get-bucket-items/:bucketName', function (req, res) {
    try {
        var bucketName = req.params.bucketName;
        
    } catch (err) {
        res.send(400).send({error, message:"Failed to get bucket items"})
    }
})

app.get('/download-bucket-image/:bucketName/:fileName', async function (req, res) {
    try {
        console.log("Downloading...")
        var bucketName = req.params.bucketName;
        var fileName = req.params.fileName;

        const file = storage.bucket(bucketName).file(fileName);
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

        // downloadFile();
        await downloadFile()
        res.sendStatus(200).send('Download complete');

        // // Delete the temporary file.
        // const unlink = promisify(fs.unlink);
        // unlink(tempLocalPath);
    } catch (err) {
        res.send(400).send({error, message:"Failed to download item from bucket"})
    }
    
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})




// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient();

