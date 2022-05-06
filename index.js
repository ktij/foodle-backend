var express = require('express');

const app = express();
const port = 3000;

app.use('/storage', require("./routes/storage"));

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
})
