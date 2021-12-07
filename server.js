const { apply } = require('core-js/fn/reflect');
const express = require('express')
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/,function(req,res) {
    res.sendfile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("Server started...")