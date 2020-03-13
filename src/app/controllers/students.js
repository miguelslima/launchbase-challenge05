const { age, date, yearSchool} = require('../../lib/utils');

module.exports = {
  index(req, res) {
    return res.render("students/index");
  },
  create(req, res) {
    return res.render('students/create');
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
      graduation,  
      workload, 
    } = req.body;

    birth = Date.parse(birth);
    id = Number(data.students.length + 1);

    data.students.push({
      id, 
      avatar_url, 
      name, 
      email,
      birth, 
      graduation, 
      workload
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }

      return res.redirect('/students');
    })  
  },
  show(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
      return student.id == id;
    });
  
    if(!foundStudent) {
      return res.send('Student not found!');
    }
  
    const student = {
      ...foundStudent,
      age: age(foundStudent.birth),
      yearSchool: yearSchool(foundStudent.yearSchool)
    }
  
    return res.render("students/show", { student });
  },
  edit(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
      return student.id == id;
    })
  
    if(!foundStudent) {
      return res.send('Student not found!');
    }
  
    const student = {
      ...foundStudent,
      birth: date(foundStudent.birth),
      yearSchool: yearSchool(foundStudent.graduation)
    }
    
    return res.render('students/edit', { student });
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundStudent = data.students.find(function(student, foundIndex){
      if(id == student.id) {
        index = foundIndex;
        return true;
      }
    })
  
    if(!foundStudent) {
      return res.send('student not found!');
    }
  
    const student = {
      ...foundStudent,
      ...req.body,
      birth: Date.parse(req.body.birth)
    }
  
    data.students[index] = student
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }
  
      return res.redirect(`/students/${id}`);
    })
  },
  delete(req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student){
      return student.id != id;
    })
  
    data.students = filteredStudents;
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('Write file error!');
      }
  
      return res.redirect(`/students`);
    })
  },
}