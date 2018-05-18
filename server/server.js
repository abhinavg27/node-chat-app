const express = require('express');
const path = require('path');

var publicFolder = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicFolder));

app.listen(port, ()=>{
    console.log(`Server is up on ${port} port`);
});