let orm = require("../config/orm.js");

let burger = {
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    insertOne: function(columns, values, cb) {
        orm.insertOne('burgers', columns, values, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColumnVals, condition, cb) {
        orm.updateOne(objColumnVals, condition, cb, function(res) {
            cb(res);
        });
    },
    deleteOne: function(condition,cb) {
        orm.deleteOne('burgers', condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;