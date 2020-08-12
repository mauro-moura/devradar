const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const secrets = require('./secrets');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

mongoose.connect(`mongodb+srv://${secrets.mongo_user}:${secrets.mongo_pass}@${secrets.mongo_dbase}.mongodb.net/${secrets.mongo_sname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const server = http.Server(app);

setupWebSocket(server);


app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
