const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student')

router.get('/', (req, res) => {
    res.render("student/addOrEdit1", {
        viewTitle: "Insert student details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertRecord(req, res);
        }else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var student = new Student();
    student.Student_id=req.body.Student_id;
    student.Student_name=req.body.Student_name;
    student.Student_dept = req.body.Student_dept;
    student.email = req.body.email;
    student.Address = req.body.Address;
    student.Phone = req.body.Phone;
    student.save((err, doc) => {
        console.log(student );
        if (!err)
            res.redirect('student/list1');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit1", {
                    viewTitle: "Insert student details",
                    student: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list1'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit1", {
                    viewTitle: 'Update student details',
                    student: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list1', (req, res) => {
    Student.find((err, docs) => {
        if (!err) { 
            res.render("student/list1", {
                // list: docs
                list1: docs.map(doc => doc.toJSON())
            });
        }
        else {
            console.log('Error in retrieving student list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Student_name':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit1", {
                viewTitle: "Update student details",
                student:doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list1');
        }
        else { console.log('Error in hall details delete :' + err); }
    });
});

module.exports = router;