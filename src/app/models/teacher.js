const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT * FROM my_teacher`, function(err, results){
        if(err) {
          throw `Database Error! ${err}`;
        }
        callback(results.rows);      
      })
  },
  create(data, callback) {
    const query = `
      INSERT INTO my_teacher (
        name,
        avatar_url,
        graduation,
        class_type,
        subjects_taught,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.graduation,
      data.class_type,
      data.subjects_taught,
      date(data.birth).iso,
      date(Date.now()).iso,
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
      SELECT * 
      FROM my_teacher 
      WHERE id = $1`, [id], function(err, results){
        if(err) {
          throw `Database Error! ${err}`;
        }
        callback(results.rows[0]); 
      })
  },
  update(data, callback) {
    const query = `
      UPDATE my_teacher SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        graduation=($4),
        class_type=($5),
        subjects_taught=($6)
      WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduation,
      data.class_type,
      data.subjects_taught,
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
    db.query(`DELETE FROM my_teacher WHERE id = $1`, [id], function(err, results){
      if(err) {
        throw `Database Error! ${err}`;
      }

      return callback();
    })
  }
}