const {Storage} = require('@google-cloud/storage');

const storage = new Storage({keyFilename: "credentials.json"});

const getItems = (req, res) => {
    try {
        if (req.params?.bucketName) {
            const bucketName = req.params.bucketName;
            
            async function listFiles() {
                // Lists files in the bucket
                const [files] = await storage.bucket(bucketName).getFiles();
                
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
    
            return 
        }
        res.statusCode=400;
        res.json({"message": "Invalid Request"})

    } catch (err) {
        res.statusCode=400;
        res.json({err, message:"Failed to get bucket items"});
    };
}
module.exports = {getItems};