var express = require('express');
var app = express();
var redis = require('redis');

// New Redis v4+ connection syntax
var client = redis.createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
});

client.on("error", function (err) {
    console.error("Redis error", err);
});

// Connect to Redis (required in v4+)
client.connect();

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/json', async function (req, res) {
    try {
        var coins = await client.hLen('wallet');
        var hashes = await client.get('hashes');
        var now = Date.now() / 1000;
        res.json({
            coins: coins,
            hashes: hashes,
            now: now
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.use(express.static('files'));

var server = app.listen(80, function () {
    console.log('WEBUI running on port 80');
});

