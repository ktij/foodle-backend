const {Storage} = require('@google-cloud/storage');

const storage = new Storage({'keyFilename': 'credentials.json'});

async function downloadItemF (fileName) {
    try {
        console.log("Downloading...");
        var bucketName = "foodle";
        const file = storage.bucket(bucketName).file(fileName);

        // Download file from bucket.
        async function downloadFile() {
            try {
                await file.download({destination: "./tmp/test"});
                console.log(`Downloaded ${file.name} to ${"./tmp/test"}.`);
            } catch (err) {
                return {"error":err.message, "message":"Download failed"};
            }
        };

        // downloadFile();
        await downloadFile();
        return {"message": "Download complete"}
        
    } catch (err) {
        return {"error":err.message, "message": "Download failed"};
    }
}
module.exports = {downloadItemF};