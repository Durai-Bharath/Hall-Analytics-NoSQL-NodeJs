const mongoose = require('mongoose');
var detailSchema = new mongoose.Schema({
    Hall_Dept :{
        type:String,
        required:true
    },
    Floor :{
        type:Number,
        required:true
    },
    Capacity :{
        type:Number,
        required:true
    }
});
var guestSchema = new mongoose.Schema({
    Guest_Name :{
        type:String,
        required:true
    },
    Organisation :{
        type:String,
        required:true
    },
    Phone_No :{
        type:Number,
        required:true
    }
});
var hallSchema = new mongoose.Schema({
    Hall_id: {
        type: Number,
        required: true,
        unique :true
    },
    Hall_name: {
        type: String,
        required : true
    },
    Event_name: {
        type: String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    session: {
        type: String,
        required:true
    },
    Event_Date: {
        type:Date,
        required:true
    },
    Event_handler_id: {
        type: Number,
        required:true
    },
    Hall_Details:detailSchema,
    Guest_Details : guestSchema
});
// Custom validation for email
hallSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');



mongoose.model('Hall', hallSchema);
