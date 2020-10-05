//arquivo responsável por operações de banco de dados
const db = require('../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        //função apenas chama quando leitura do banco de dados
        db.query(`SELECT * FROM teachers`, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers(
            avatar_url,
            name,
            birth,
            schooling,
            services,
            created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.services,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
                SELECT * 
                FROM teachers 
                WHERE id = $1`, [id], function(err, results){
                    if (err) throw `Database error!${err}`
                    callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                schooling=($4),
                services=($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error!${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(
            `DELETE 
                FROM teachers 
                WHERE id = $1
            `
            , [id], function(err, results){
            if (err) throw `Database error!${err}`

            return callback()
        })
    }
}