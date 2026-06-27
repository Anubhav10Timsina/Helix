const express = require('express')
const app = express();
app.use(express.json())


let notes = [
    {
        "id" : 1,
        "title": "Grocerry"

    }, 
    {
        "id" : 2,
        "title": "Clothes"
    }
];

let nextId = 1 ;

app.post('/notes', (req, res)=>{
    
    newNote = req.body;
    if(!newNote){ 
        return res.status(400).json({
            error : 'Note Content is required'
        })
    }
    notes.push(newNote);
    res.status(201).json({
        message : "Note added successfully"
    })

})

app.get('/getNotes',(req, res)=>{
    res.status(200).json(notes)
})

app.get('/getNotes/:id',(req, res)=>{

     const noteID = parseInt(req.params.id,10)
     const getNote = notes.find(n=>n.id === noteID)

     if(!getNote){
        res.status(404).json({
            error : "Note Missing"
        })
     }
     res.status(200).send(getNote)
   
})

app.put('/notes/:id', (req, res)=>{

    getId = parseInt(req.params.id, 10);
    const note = notes.find(n=> n.id === getId)

    if(!note){
        res.status(404).json({
            error : "Note not found"
        })
    }

    note.title = req.body.title || note.title 

    res.status(200).json({
        message : "Note Updated"
    })

})

app.delete('/notes/:id', (req, res)=>{
   const getId = parseInt(req.params.id, 10)
   const noteIndex = notes.findIndex(n=> n.id === getId)

   if(noteIndex===-1){
    res.status(404).json({
        error : "Note doesn't exist"
    })
   }

   notes.splice(noteIndex, 1);

   res.status(200).json({
    message : "removed"
   })

   
})

app.listen(3000, ()=>{
    console.log('Server awake on http://localhost:3000');
});