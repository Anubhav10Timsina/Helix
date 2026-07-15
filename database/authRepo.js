const pool = require('./db')
const bcrypt = require('bcrypt')

async function findUserByEmail(email){
    const userEmail = await pool.query(
        `SELECT * FROM users WHERE 
        email = $1 `,[email]
    );
    return userEmail.rows[0];
}
async function createUser(email, password){

    const saltCost = 12;
    const hashedPassword = await bcrypt.hash(password, saltCost)

    const storeCredentials = await pool.query(
        `INSERT INTO users (email, hashedpassword) VALUES ($1, $2)
        RETURNING * `,[email, hashedPassword]
    );
    return storeCredentials.rows[0];

}

module.exports = {
    findUserByEmail,
    createUser
};