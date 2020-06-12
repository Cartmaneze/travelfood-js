'use strict';

const Koa          = require('koa');
const initializers = require('./initializers');
const cors         = require('@koa/cors');

const app = new Koa();
app.name = 'TravelFood';
app.use(cors({
    credentials: true
}));

initializers(app)
    .then(() => {
        app.listen(1234, function() {
            console.log(`HTTP Server started, listening on port 1234`);
        });
    })
    .catch(error => {
        console.log(`Sequelize sync error, failed to start listen port(s), ${error}`);
        throw error;
    });
