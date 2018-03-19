'use strict';
module.exports = function(app) {
    //var todoList = require('../controllers/controllers');
    var studentApp = require('../controllers/controller');


    // student app Routes
    app.route('/students')
        .get(studentApp.list_all_student)
        .post(studentApp.create_a_student);


    app.route('/students/:id')
        .get(studentApp.read_a_student)
        .put(studentApp.update_a_student)
        .delete(studentApp.delete_a_student);
};
