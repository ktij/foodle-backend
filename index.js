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

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials
//     authorize(JSON.parse(content));
// });

// function authorize(credentials, callback) {
//     const {client_secret, client_id, redirect_uris} = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris[0]);

//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) return getAccessToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//     });
// }

const storage = new Storage({keyFilename: "/credentials.json"});

app.get('/get-bucket-items/:bucketName', function (req, res) {
    // The ID of your GCS bucket
    var bucketName = req.params.bucketName;
    
    async function listFiles() {
        // Lists files in the bucket
        const [files] = await storage.bucket(bucketName).getFiles();
        
        console.log('Files:');
        var arr = [];

        files.forEach(file => {
            arr.push(file.name);
        });
        
        return arr;
    }

    var pending_result = listFiles();
    pending_result.then(function(result){
        var arr = result;
        res.send(arr);
    });

    // var arr = await listFiles();
    // res.send(arr);
    
})

app.get('/download-bucket-image/:bucketName/:fileName', function (req, res) {
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
    downloadFile().catch(console.error);
    res.sendStatus(200).send('OK');

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

