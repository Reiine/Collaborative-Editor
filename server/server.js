const express = require('express');
const cors = require('cors');
const document = require('./models/document');

const app = express();
app.use(cors());
const io = require('socket.io')(3001,{
    cors:{
        origin: 'https://editor-reiine.netlify.app',
        methods: ['GET', 'POST']
    }
});

const defaultText = "";
io.on('connection', socket=>{
    socket.on("get-document", async docId=>{
        const doc = await findDoc(docId);
        socket.emit("load-document", doc.text);
        socket.on("send-changes",delta=>{
            socket.broadcast.to(docId).emit("receive-changes",delta);
        })
        socket.on("save-document",async text =>{
            await document.findByIdAndUpdate(docId,{text:text});
        })
    })
})

const findDoc = async (docId) => {
    if (docId == null) return defaultText;
    const doc = await document.findById({_id:docId});
    if(doc ) return doc;
    return await document.create({_id:docId,text:defaultText});
};
