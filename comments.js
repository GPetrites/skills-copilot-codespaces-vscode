// Create web server
// npm install express
// npm install body-parser
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

// Return all comments
app.get('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});

// Create new comment
app.post('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                return;
            }
            res.send('Comment added');
        });
    });
});

// Start server
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});