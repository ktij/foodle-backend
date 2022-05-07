const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

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
                res.statusCode=400;
                res.json({"error":err.message, "message":"Download failed"});
            }
        };

        // downloadFile();
        await downloadFile();
        res.statusCode=200;
        res.json({"message": "Download complete"})
        
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Download failed"});
    }
}
module.exports = {downloadItem};