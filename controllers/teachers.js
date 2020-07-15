const fs = require("fs");
const data = require("../data.json");
const {age, date, populatestates} = require("../utils")

exports.index = function(req, res){
    return res.render("teachers/index", {teachers: data.teachers})
}


//show
exports.show = function(req, res){
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    })
    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,

        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        //state: populatestates(foundTeacher.state),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", {teacher: teacher})
}

//create
exports.create = function(req, res){
    return res.render('teachers/create')
}

exports.post = function(req, res){
    const keys = Object.keys(req.body);
    for (key of keys){
        if(req.body[key] == ""){
            return res.send("Please fill all the fields");
        }
    }

    let{avatar_url, name, birth, class_type,schooling, services} = req.body

    birth = Date.parse(req.body.birth);
    created_at = Date.now();
    let id = 1
    const lastTeacher = data.teachers[data.teachers.lenght - 1]
    if (lastTeacher){
        id = lastTeacher.id + 1
    }

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        class_type,
        services,
        created_at
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect("/teachers")
    })
}

//edit
exports.edit = function(req, res){
    const { id } =  req.params
    
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    })
    if(!foundTeacher) return res.send("Teacher not found!")
    
    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }

    return res.render("teachers/edit", {teacher})
}

//put

exports.put = function(req, res){
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex
            return true
        }
    })
    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.teachers[index] = teacher
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect(`/teachers/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error");
        
        return res.redirect("/teachers")
    })
}