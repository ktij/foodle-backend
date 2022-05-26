const {PythonShell} = require('python-shell');

async function extractNutritionF(fileName) {
    try {

        var url = `https://storage.googleapis.com/foodle/${fileName}`;
        
        var options = {
            mode: 'text',
            // pythonPath: myPythonScriptPath,
            pythonOptions: ['-u'],
            scriptPath: './controllers',
            args: [url]
        };

        const result = await new Promise((resolve, reject) => {
            PythonShell.run('getTable.py', options, function(err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                return resolve(results);
            });
        });
        return result;

    } catch (err) {
        return {"error":err.message, "message": "Failed to get nutrition"};
    }
};
module.exports = {extractNutritionF};