const student = require("../models/student")
const { age, date } = require("../../lib/utils")


module.exports = {
    /* Shorthand Object JS */
    index(req, res) {

        student.all(function(students){
            return res.render("students/index", {students})
        })

    },
    create(req, res) {
        return res.render('students/create')

    },
    post(req, res) {
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
        student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
        
    },
    show(req, res) {
        student.find(req.params.id, function(student){
            if (!student) return res.send("student not found!")

            student.age = age(student.birth)

            return res.render("students/show", {student})
        })
    },
    edit(req, res) {
        student.find(req.params.id, function(student){
            if (!student) return res.send("student not found!")

            student.birth = date(student.birth).iso

            return res.render("students/edit", {student})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
        student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    },

}
