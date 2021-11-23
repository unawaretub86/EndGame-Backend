(function (){
    
    var express = require('express');
    var router = express.Router();

    var UserMiddleware = require('./user.module')().UserMiddleware;

    router.get('/',
        UserMiddleware.getUsers,
        function (req, res){
            res.status(200).json(req.response);
    });


    module.exports = router;

})();