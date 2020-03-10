const { age, date, yearSchool} = require('../../lib');

module.exports = {
  index(req, res) {
    return res.render("teachers/index");
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

    let { 
      id, 
      avatar_url, 
      name, 
      email,
      birth, 
      select,  
      workload, 
    } = req.body;

    birth = Date.parse(birth);
    id = Number(data.teachers.length + 1);

    data.teachers.push({
      id, 
      avatar_url, 
      name, 
      email,
      birth, 
      select, 
      workload
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }

      return res.redirect('/teachers');
    })  
  },
  show(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
      return teacher.id == id;
    });
  
    if(!foundTeacher) {
      return res.send('Teacher not found!');
    }
  
    const teacher = {
      ...foundTeacher,
      age: age(foundTeacher.birth),
      yearSchool: yearSchool(foundTeacher.yearSchool)
    }
  
    return res.render("teachers/show", { teacher });
  },
  edit(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
      return teacher.id == id;
    })
  
    if(!foundTeacher) {
      return res.send('Teacher not found!');
    }
  
    const teacher = {
      ...foundTeacher,
      birth: date(foundTeacher.birth),
      yearSchool: yearSchool(foundTeacher.select)
    }
    
    return res.render('teachers/edit', { teacher });
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
      if(id == teacher.id) {
        index = foundIndex;
        return true;
      }
    })
  
    if(!foundTeacher) {
      return res.send('teacher not found!');
    }
  
    const teacher = {
      ...foundTeacher,
      ...req.body,
      birth: Date.parse(req.body.birth)
    }
  
    data.teachers[index] = teacher
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }
  
      return res.redirect(`/teachers/${id}`);
    })
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