
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Faculty = mongoose.model('Faculty')

router.get('/', (req, res) => {
    res.render("faculty/addOrEdit2", {
        viewTitle: "Insert faculty details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertRecord(req, res);
        }else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var faculty = new Faculty();
    faculty.Faculty_id=req.body.Faculty_id;
    faculty.Faculty_name=req.body.Faculty_name;
    faculty.Faculty_dept = req.body.Faculty_dept;
    faculty.email = req.body.email;
    faculty.Address = req.body.Address;
    faculty.Phone = req.body.Phone;
    faculty.save((err, doc) => {
        //console.log(faculty );
        if (!err)
            res.redirect('faculty/list2');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("faculty/addOrEdit2", {
                    viewTitle: "Insert faculty details",
                    faculty: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Faculty.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('faculty/list2'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("faculty/addOrEdit2", {
                    viewTitle: 'Update faculty details',
                    faculty: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list2', (req, res) => {
    Faculty.find((err, docs) => {
        if (!err) { 
            res.render("faculty/list2", {
                // list: docs
                list2: docs.map(doc => doc.toJSON())
            });
        }
        else {
            console.log('Error in retrieving faculty list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Faculty_name':
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
    Faculty.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("faculty/addOrEdit2", {
                viewTitle: "Update faculty details",
                faculty:doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Faculty.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/faculty/list2');
        }
        else { console.log('Error in faculty details delete :' + err); }
    });
});

module.exports = router;