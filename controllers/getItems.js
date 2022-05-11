const {Storage} = require('@google-cloud/storage');

const storage = new Storage({'keyFilename': 'credentials.json'});

const getItems = (req, res) => {
    try {
        const bucketName = req.params.bucketName;
        
        async function listFiles() {
            try {
                const [files] = await storage.bucket(bucketName).getFiles();
                var arr = [];
                files.forEach(file => {
                    arr.push(file.name);
                });
                res.statusCode=200;
                res.json({"items": arr});
            } catch (err) {
                res.statusCode=400;
                res.json({"error":err.message, "message":"Failed to get bucket items"});
            };
        }
        
        listFiles();

    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message":"Failed to get bucket items"});
    };
}
module.exports = {getItems};