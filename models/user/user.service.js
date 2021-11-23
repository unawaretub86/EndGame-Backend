(function () {
    'use strict';

    module.exports = {
        fetchUsers: fetchUsers
    }

    var UserModel = require('./user.module')().UserModel;

    function fetchUsers(){
        return UserModel.find({})
            .exec();
    }

})();