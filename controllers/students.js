const fs = require("fs");
const data = require("../data.json");
const {age, date, populatestates} = require("../utils")

exports.index = function(req, res){
    return res.render("students/index", {students: data.students})
}


//show
exports.show = function(req, res){
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    })
    if(!foundStudent) return res.send("student not found!");

    const student = {
        ...foundStudent,

        age: age(foundStudent.birth),
        //state: populatestates(foundStudent.state),
    }

    return res.render("students/show", {student: student})
}

//create
exports.create = function(req, res){
    return res.render('students/create')
}

exports.post = function(req, res){
    const keys = Object.keys(req.body);
    for (key of keys){
        if(req.body[key] == ""){
            return res.send("Please fill all the fields");
        }
    }

    birth = Date.parse(req.body.birth);
    let id = 1
    const lastStudent = data.students[data.students.lenght - 1]
    if (lastStudent){
        id = lastStudent.id + 1
    }
    //const state = populatestates(foundStudent.state);

    data.students.push({
        id,
        ...req.body,
        birth,
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect("/students")
    })
}

//edit
exports.edit = function(req, res){
    const { id } =  req.params
    
    const foundStudent = data.students.find(function(student){
        return student.id == id;
    })
    if(!foundStudent) return res.send("student not found!")
    
    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
    }

    return res.render("students/edit", {student})
}

//put
exports.put = function(req, res){
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id){
            index = foundIndex
            return true
        }
    })
    if(!foundStudent) return res.send("student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.students[index] = student
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect(`/students/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body
    const filteredstudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredstudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect("/students")
    })
}