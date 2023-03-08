const { Pool } = require('pg')
 
const pool = new Pool({database: "userDb"})

module.exports = pool



// const { Client } = require('pg')
// const client = new Client({database: "userDb"})

// async function simplequery(params) {
//     await client.connect()
 
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()
// }
// simplequery()


