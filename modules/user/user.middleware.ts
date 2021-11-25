(function () {

    module.exports = {
        getUsers: getUsers
    };

    var UserService = require('./user.module')().UserService;

    function getUsers(req, res, next) {
        UserService.fetchUsers()
            .then(success)
            .catch(failure);
        
        function success(data) {
            req.response = data;
            next();
        }

        function failure(error){
            next(error);
        }
    }
    

    function addUser(req, res, next) {

    }

})();