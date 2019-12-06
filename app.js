'use strict';

const Koa          = require('koa');
const initializers = require('./initializers');

const app = new Koa();
app.name = 'TravelFood';

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
