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
    static async getUserByUsername(username, password){
        let sql = `select * from users where username=$1 AND password = crypt($2, password)`
        let values = [username, password]
        try {
            const res = await pool.query(sql, values)
            if(res.rows.length > 0){
                return new User(res.rows[0].username, res.rows[0].password)
            }else{
                return null
            }
          } catch (err) {
            console.log(err.stack)
          }

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