const pool = require("./db")

async function createNote(title){
    const notes = await pool.query("INSERT INTO notes (title) VALUES ($1) RETURNING * ",[title]);
    return notes.rows;

}
async function getAllNotes(){
    const notes = await pool.query("SELECT * from notes ");
    return notes.rows;
}
async function getNotesById(id){
    const notes = await pool.query("SELECT * from notes WHERE id = $1",[id]);
    return notes.rows[0];
}
async function updateNotesById(title, id){

    const notes = await pool.query(
        `
        UPDATE notes
        SET title = $1 
        WHERE id = $2
        RETURNING * `,[title, id]);
    return notes.rows[0];
}
async function deleteNoteById(id){
    const noteToDelete = await pool.query(`
        DELETE FROM notes
        WHERE id = $1 
        RETURNING *
        `,[id]);
    return noteToDelete.rows[0];
}

module.exports = {
    createNote,
    getAllNotes,
    getNotesById,
    updateNotesById,
    deleteNoteById
};