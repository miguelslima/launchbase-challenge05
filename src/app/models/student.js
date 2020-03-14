const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT * FROM students`, function(err, results){
        if(err) {
          throw `Database Error! ${err}`;
        }
        callback(results.rows);      
      })
  },
  create(data, callback) {
    const query = `
      INSERT INTO students (
        name,
        avatar_url,
        email,
        yearSchool,
        workload,
        birth,
        created_at,
        teacher_id,
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.yearSchool,
      data.workload,
      date(data.birth).iso,
      date(Date.now()).iso,
      data.teachers
    ]

    console.log(values)

    db.query(query, values, function(err, results){
      if(err) {
         throw `Database Error! ${err}`;
      }
      
      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1`, [id], function(err, results){
      
      if(err){
        throw `Database Error! ${err}`;
      }

      callback(results.rows[0]);
    })
  },
  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        email=($4),
        yearSchool=($5),
        teacher_id=($6)
      WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.yearSchool,
      data.teachers,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      callback();
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM student WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback(results.rows);
    })
  }
}