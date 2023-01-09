const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Hall = mongoose.model('Hall');

router.get('/', (req, res) => {
    res.render("hall/addOrEdit", {
        viewTitle: "Insert hall details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var hall = new Hall();
    var Hall_Dept=req.body.Hall_Dept;
    var Floor =req.body.Floor;
    var Capacity=req.body.Capacity;
    var Guest_Name=req.body.Guest_Name;
    var Organisation =req.body.Organisation;
    var Phone_No=req.body.Phone_No;
    hall.Hall_Details={Hall_Dept,Floor,Capacity}
    hall.Guest_Details={Guest_Name,Organisation,Phone_No}
    hall.Event_Date = req.body.Event_Date;
    hall.Hall_id = req.body.Hall_id;
    hall.Hall_name = req.body.Hall_name;
    hall.Event_name = req.body.Event_name;
    hall.Event_handler_id = req.body.Event_handler_id;
    hall.email = req.body.email;
    hall.session = req.body.session;
    hall.save((err, doc) => {
        if (!err)
            res.redirect('hall/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("hall/addOrEdit", {
                    viewTitle: "Insert hall details",
                    hall: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Hall.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('hall/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("hall/addOrEdit", {
                    viewTitle: 'Update hall details',
                    hall: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Hall.find((err, docs) => {
        if (!err) {
            res.render("hall/list", {
                // list: docs
                list: docs.map(doc => doc.toJSON())
            });
        }
        else {
            console.log('Error in retrieving hall list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Hall_name':
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
    Hall.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("hall/addOrEdit", {
                viewTitle: "Update hall details",
                hall:doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Hall.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/hall/list');
        }
        else { console.log('Error in hall details delete :' + err); }
    });
});

module.exports = router;






