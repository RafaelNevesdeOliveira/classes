//arquivo responsável por operações de banco de dados
const db = require('../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        //função apenas chama quando leitura do banco de dados
        db.query(`SELECT * FROM students`, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students(
            avatar_url,
            name,
            email,
            birth,
            schoolyear,
            time
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.time
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
                SELECT * 
                FROM students 
                WHERE id = $1`, [id], function(err, results){
                    if (err) throw `Database error!${err}`
                    callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth=($4),
                schoolyear=($5),
                time=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.time,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error!${err}`  
            console.log(values)
            callback()
        })
    },
    delete(id, callback){
        db.query(
            `DELETE 
                FROM students 
                WHERE id = $1
            `
            , [id], function(err, results){
            if (err) throw `Database error!${err}`

            return callback()
        })
    }
}