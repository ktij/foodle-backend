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

        nutrition = result;

        for (i in nutrition) { // replace ' with " so its parsable by JSON
            nutrition[i] = nutrition[i].replace(/'/g, '"');
        };

        var rNutrition = [JSON.parse(nutrition[0]), JSON.parse(nutrition[1])];

        return rNutrition;

    } catch (err) {
        return {"error":err.message, "message": "Failed to get nutrition"};
    }
};
module.exports = {extractNutritionF};