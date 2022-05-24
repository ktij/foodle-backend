const {PythonShell} = require('python-shell');

async function extractNutrition (req, res) {
    try {
        const fileName =  req.params.fileName;
        const bucketName = req.params.bucketName;

        var url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        
        var options = {
            mode: 'text',
            // pythonPath: myPythonScriptPath,
            pythonOptions: ['-u'],
            scriptPath: './controllers',
            args: [url]
        };

        PythonShell.run('getTable.py', options, function(err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            res.statusCode=200;
            res.json({"nutrition": results});
        });
    } catch (err) {
        res.statusCode=400;
        res.json({"error":err.message, "message": "Failed to get nutrition"});
    }
}
module.exports = {extractNutrition};