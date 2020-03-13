const { age, date, yearSchool, graduation} = require('../../lib/utils');
const Teacher = require('../models/teacher');

module.exports = {
  index(req, res) {

    Teacher.all(function(teachers){

      return res.render("teachers/index", {teachers});
    })
  },
  create(req, res) {
    return res.render('teachers/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
      return res.send("Please, fill all fields");
    }

    Teacher.create(req.body, function(teacher){
      
      return res.redirect(`/teachers/${teacher.id}`); 
    })
  },
  show(req, res) {
    Teacher.find(req.params.id, function(teacher){
      if(!teacher) {
        return res.send("Teacher not found");
      }

      teacher.age = age(teacher.birth);
      teacher.graduation = graduation(teacher.graduation);
      teacher.subjects_taught = teacher.subjects_taught.split(",");
      teacher.created_at = date(teacher.created_at).format;

      return res.render("teachers/show", { teacher })
    })
  },
  edit(req, res) {
    Teacher.find(req.params.id, function(teacher){
      if(!teacher) {
        return res.send('Teacher not found!');
      }

      teacher.birth = date(teacher.birth).iso;

      return res.render('teachers/edit', { teacher });
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == ""){
        return res.send('Pleaser, fill all fields');
      }

      Teacher.update(req.body, function(){
        return res.redirect(`/teachers/${req.body.id}`);
      })
    }
  },
  delete(req, res) {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher){
      return teacher.id != id;
    })
  
    data.teachers = filteredTeachers;
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }
  
      return res.redirect(`/teachers`);
    })
  },
}