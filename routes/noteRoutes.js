const express = require('express')
const router = express.Router();
const notes = require("../database/notesRepo")

router.post('/notes', async (req, res)=>{
    
    title = req.body.title
    const result = await notes.createNote(title);
    res.status(200).json(result)

})

router.get('/getNotes', async (req, res)=>{

    const result = await notes.getAllNotes();
    res.status(200).json(result)
})

router.get('/getNotes/:id',async (req, res)=>{

    try{
        const noteID = parseInt(req.params.id,10)
     
        result = await notes.getNotesById(noteID);
        
        if(!result){
           res.status(404).json({
               "error" : "Note doesn't exist"
           });
        }     
        res.status(200).json(result);  
    }catch(error){
        res.status(500).json({
            "error" : "Internal Server Error"
        });
    }
})

router.put('/updateNotes/:id', async (req, res)=>{

    try{

        const getId = parseInt(req.params.id, 10) ;
        const getTitle = req.body.title ;
        const updateNotes = await notes.updateNotesById(getTitle, getId) ;

        if(!updateNotes){
            res.status(404).json({
                "error" : "Note not found"
            });
        }else{
        res.status(200).json(updateNotes);
        }

    } catch(error){
        console.error(error);
        res.status(500).json({
            "error" :error.message
        });
    }

})

router.delete('/notes/:id', (req, res)=>{

    try{
        const getId = parseInt(req.params.id, 10)
        const result = notes.deleteNoteById(getId);

        if(!result){
            res.status(404).json({
                "error" : "Note not found"
            });
        }
        res.status(200).json({
            "message" : "Note Deleted"
        });
    }catch(error){
        res.status(500).json({
            "error" : "Internal Server Error"
        });
    }

})

module.exports = router ;