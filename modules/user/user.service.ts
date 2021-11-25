import { UserModel } from "./user.model";

(function () {
    module.exports = {
        fetchUsers: fetchUsers
    }

    var UsuarioModel = require('./user.module')().UserModel;

    function fetchUsers(){
        // return UserModel.find().exec();
        return("object");
    }
})