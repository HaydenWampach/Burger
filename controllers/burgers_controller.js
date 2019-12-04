let burger = require('../models/burger.js');
module.exports = {
    //function to pull back data from db.
    selectAll: function(req, res) {
        burger.selectAll(function (dbFind) {
            let handleObject = {
                burgers: dbFind
            };
            //render data into html template 
            res.render('index', handleObject);
        });
    },
    //insert function to post data from user entry directly into db.
    insertOne: function(req, res) {
        burger.insertOne(
            ['burger_name', 'devoured'],
            [req.body.burger_name, req.body.devoured], function (dbCreate) {
                res.json({ id: dbCreate.insertId });
            });
    },
    updateOne: function(req, res) {
        var id = parseInt(req.params.id);
        let devour = parseInt(req.body.devoured);
        (devour ===0) ? devour = 1 : devour = 0;
        burger.updateOne({
            devoured: devour
        }, 
        {
            id: id
        }, function (result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.json(false).status(404).end();
            } else {
                res.json(true).status(200).end();
            }
        });
    },
    deleteOne: function(req, res) {
        let condition = 'id = ' + parseInt(req.params.id);

        burger.deleteOne(condition, function(dbDelete) {

            
            if (dbDelete.affectedRow === 0) {
                return res.json(false).status(404);
            } else {
                res.json(true).status(200);
            }
        });
    }
}