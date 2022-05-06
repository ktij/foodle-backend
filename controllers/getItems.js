const {Storage} = require('@google-cloud/storage');

const storage = new Storage({keyFilename: "credentials.json"});

const getItems = (req, res) => {
    try {
        if (req.params?.bucketName) {
            const bucketName = req.params.bucketName;
            
            async function listFiles() {
                try {
                    const [files] = await storage.bucket(bucketName).getFiles();
                
                    var arr = [];
        
                    files.forEach(file => {
                        arr.push(file.name);
                    });
                    
                    return arr;
                } catch (err) {
                    res.statusCode=400;
                    res.json({"error":err, "message":"Failed to get bucket items"});
                };
                // Lists files in the bucket
                
            }
            
            var pending_result = listFiles();
            pending_result.then(function(result){
                var arr = result;
                res.statusCode=200;
                res.json({"items": arr});
            });
    
            return 
        }
        res.statusCode=400;
        res.json({"message": "Invalid Request"})

    } catch (err) {
        res.statusCode=400;
        res.json({"error":err, "message":"Failed to get bucket items"});
    };
}
module.exports = {getItems};