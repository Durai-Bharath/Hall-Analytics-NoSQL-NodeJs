const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    Student_id:{
        type:Number,
        required:true,
        unique:true
    },
    Student_name :
    {
        type:String,
        required:true
    },
    Student_dept:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Address:
    {
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    }
});

studentSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Student',studentSchema)