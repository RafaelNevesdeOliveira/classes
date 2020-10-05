const teacher = require("../models/teacher")
const { age, date } = require("../../lib/utils")


module.exports = {
    /* Shorthand Object JS */
    index(req, res) {

        teacher.all(function(teachers){
            return res.render("teachers/index", {teachers})
        })

    },
    create(req, res) {
        return res.render('teachers/create')

    },
    post(req, res) {
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
        teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
        
    },
    show(req, res) {
        teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("teacher not found!")

            teacher.age = age(teacher.birth)
            teacher.services = teacher.services.split(",")

            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", {teacher})
        })
    },
    edit(req, res) {
        teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("teacher not found!")

            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
        teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    },

}
