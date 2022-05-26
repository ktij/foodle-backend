const {PythonShell} = require('python-shell');
const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({'keyFilename': 'credentials.json'});

async function getRecommendationsF(id) {
    // try {
        var options = {
            mode: 'text',
            // pythonPath: myPythonScriptPath,
            pythonOptions: ['-u'],
            scriptPath: './controllers',
            args: [id]
        };

        const result = await new Promise((resolve, reject) => {
            PythonShell.run('getRecommendations.py', options, function(err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                return resolve(results);
            });
        });

        return result;
    // } catch (err) {
    //     return {"error":err.message, "message": "Failed to get nutrition"};
    // }
};
module.exports = {getRecommendationsF};