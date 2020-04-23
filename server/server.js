const http = require('http');
const port = process.env.PORT || 8080;

const app = require('./app');

const server = http.createServer(app);
server.listen(port, '172.31.89.21',function() {
    console.log(`Listening on port ${port}`);
});