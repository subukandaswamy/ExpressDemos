const pool = require('../db')
class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
    save() {
        let sql = `INSERT INTO users (username, password) VALUES (
            $1,
            crypt($2, gen_salt('bf'))
        )`
        let values = [this.username, this.password]
        pool.query(sql, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            }
        })
    }
    static deleteAllUsers(){
        let sql = `TRUNCATE TABLE users`
        pool.query(sql, (err, res) => {
            if (err) {
                console.log(err.stack)
            }
        })
    }
}

module.exports = User