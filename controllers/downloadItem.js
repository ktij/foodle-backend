const {Storage} = require('@google-cloud/storage');

const storage = new Storage({keyFilename: "credentials.json"});

async function downloadItem (req, res) {
    try {
        console.log("Downloading...");
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
        await downloadFile();
        res.sendStatus(200).send('Download complete');

        // // Delete the temporary file.
        // const unlink = promisify(fs.unlink);
        // unlink(tempLocalPath);
    } catch (err) {
        res.send(400).send({error, message:"Failed to download item from bucket"})
    }
}
module.exports = {downloadItem};