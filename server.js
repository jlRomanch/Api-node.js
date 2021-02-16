const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const postRoute = require('./routes/post');

server.use(bodyParser.json());
server.use('/', postRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));