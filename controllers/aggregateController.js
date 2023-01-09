const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Faculty = mongoose.model('Faculty');
const Hall = mongoose.model('Hall');
const Student = mongoose.model('Student');

router.get('/ans1', (req, res) => {
    Student.aggregate([{$match: { Student_dept: "IT" }},{$project: { Student_name: 1,Student_dept:1 }}]).exec((err,docs)=>{
                if (!err) { 
                    res.render("aggregate/ans1", {
                    ans1 : docs
                    // ans1 : docs.map(doc => JSON.stringify(doc))
                    // docs.map(doc => doc.toJSON())
                    })
                }
                else {
                    console.log('Error in retrieving faculty list :' + err);
                }
            });
        });

router.get('/ans2', (req, res) => {
Hall.aggregate([{$group: { _id:"$Hall_Details.Hall_Dept",total_room:{$sum:1}}}]).exec((err,docs)=>{
    if (!err) { 
        res.render("aggregate/ans2", {
        ans2 : docs
        // db.universities.aggregate([
        //     { $group : { _id : '$name', totaldocs : { $sum : 1 } } }
        //   ]).pretty()
                                // ans1 : docs.map(doc => JSON.stringify(doc))
                                // docs.map(doc => doc.toJSON())
        })
       }
        else {
        console.log('Error in retrieving faculty list :' + err);
        }
        });
    });

    router.get('/ans3', (req, res) => {
        Hall.aggregate([{$group: { _id:"$Hall_name" ,
        max_seating:{$max:"$Hall_Details.Capacity"}}},{$sort:{max_seating:-1}}]).exec((err,docs)=>{
                    if (!err) { 
                        res.render("aggregate/ans3", {
                        ans3 : docs
                        // ans1 : docs.map(doc => JSON.stringify(doc))
                        // docs.map(doc => doc.toJSON())
                        })
                    }
                    else {
                        console.log('Error in retrieving faculty list :' + err);
                    }
                });
            });

        router.get('/ans4', (req, res) => {
                Hall.aggregate([{$group: { _id:"$Hall_name" ,
                max_seating:{$max:"$Hall_Details.Capacity"}}},{$sort:{max_seating:1}}]).exec((err,docs)=>{
                            if (!err) { 
                                res.render("aggregate/ans4", {
                                ans4 : docs
                                })
                            }
                            else {
                                console.log('Error in retrieving faculty list :' + err);
                            }
                        });
                    });
                    router.get('/ans5', (req, res) => {
                        Faculty.aggregate([{$match: { Faculty_dept: "IT" }},{$project: { Faculty_name: 1,Faculty_dept:1 }}]).exec((err,docs)=>{
                                    if (!err) { 
                                        res.render("aggregate/ans5", {
                                        ans5 : docs
                                        // ans1 : docs.map(doc => JSON.stringify(doc))
                                        // docs.map(doc => doc.toJSON())
                                        })
                                    }
                                    else {
                                        console.log('Error in retrieving faculty list :' + err);
                                    }
                                });
                            });
router.get('/ans6', (req, res) => {
    Hall.aggregate([{$lookup: {
        from: "students",
        localField: "Event_handler_id",
        foreignField: "Student_id",
        as:"id"}},{$unwind:"$id"},{ $group:{
            _id:"$id.Student_name",Total_Event:{$sum:1}}}]).exec((err,docs)=>{
        if (!err) { 
            res.render("aggregate/ans6", {
            ans6 : docs
            })
        }
        else {
            console.log('Error in retrieving faculty list :' + err);
        }
        });
    });


    router.get('/ans7', (req, res) => {
        Hall.aggregate([{$lookup: {
            from: "faculties",
            localField: "Event_handler_id",
            foreignField: "Faculty_id",
            as:"id"}},{$unwind:"$id"},{ $group:{
                _id:"$id.Faculty_name",Total_Event:{$sum:1}}}]).exec((err,docs)=>{
            if (!err) { 
                res.render("aggregate/ans7", {
                ans7 : docs
                })
            }
            else {
                console.log('Error in retrieving faculty list :' + err);
            }
            });
        });
    

    // db.halls.aggregate([
    //     {$lookup: {
    //        from: "students",
    //        localField: "Event_handler_id",
    //        foreignField: "Student_id",
    //        as:"id"}},
    //         {
    //           $project:{
    //              "id.Student_name":1,Event_handler_id:1
    //           }}
    //        ]).pretty()
    // router.get('/ans3', (req, res) => {
    //     Hall.aggregate([{$lookup: {
    //         from: "students",
    //         localField: "Event_handler_id",    
    //         foreignField: "Student_id",  
    //         as: "id"
    //      }},{$unwind:"id"},{$match: { Student_dept: "IT" }},{$project: { Student_name: 1 }}]).exec((err,docs)=>{
    //                 if (!err) { 
    //                     res.render("aggregate/ans1", {
    //                     ans1 : docs
    //                     // ans1 : docs.map(doc => JSON.stringify(doc))
    //                     // docs.map(doc => doc.toJSON())
    //                     })
    //                 }
    //                 else {
    //                     console.log('Error in retrieving faculty list :' + err);
    //                 }
    //             });
    //         });


module.exports = router;