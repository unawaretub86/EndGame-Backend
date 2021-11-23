(function () {
    'use strict';

    module.exports = {
        init: init
    };

    var mongoose = require('mongoose'); //ORM

    var mongodbConfig = require('../../db/config/mongodb-config').mongodbConfig;

    function init() {
        var options = {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        };

        var connectionString = prepareConnectionString(mongodbConfig);

        mongoose.connect(connectionString, options)
            .then(function (result) {
                console.log("MongoDB connection successful. DB: " + connectionString);
            })
            .catch(function (error) {
                console.log("mongodbConfig= "+mongodbConfig.database);
                console.log(error.message);
                console.log("Error occurred while connecting to DB: : " + connectionString);
            });
    }

    function prepareConnectionString(config) {

        var connectionString = 'mongodb+srv://';

        if (config.user) {
            connectionString += config.user + ':' + config.password + '@';
        }

        connectionString += config.server + '/' + config.database+"?retryWrites=true&w=majority";

        return connectionString;
    }

})();