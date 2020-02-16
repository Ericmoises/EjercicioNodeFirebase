// video https://www.youtube.com/watch?v=b6KJ7FSMifw&t=312s
const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const xlsx = require('xlsx');

var serviceAccount = require("../../node-firebase-example-eff00-firebase-adminsdk-s8jz7-b4b23d4a50.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://node-firebase-example-eff00.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res, next)=>{
    db.ref('users').once('value', (snapshot) => {
       const data = snapshot.val();
       res.render('index', {users: data});
    });
});

router.post('/new_user', (req, res) => { 
    const newContact = {
        name: req.body.name,
        firstSurname: req.body.lastname,
        secondSurname: req.body.lastname2,
        contact:{
            email: req.body.email,
            phone: req.body.phone,
        },
        role: "",
        verified: false,
        disabled: false,
                
    }; 
    db.ref('users').push(newContact); 
    res.redirect('/');
});

router.get('/delete-user/:id', (req, res) => {
    db.ref('users/' + req.params.id).remove();
    res.redirect('/');
});



router.get('/', (req, res)=>{
    db.ref('events').once('value', (snapshot) => {
       const data = snapshot.val();
       res.render('index', {events: data});
    });
});

router.post('/new_event', (req, res) => { 
    const newEvent = {
        name: req.body.eventName,
        description: req.body.eventDescription,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        country: req.body.country,
        beneficiaries: [""],
        anfitrions: [""],
                 
    }; 
    db.ref('events').push(newEvent); 
    res.redirect('/');
});

router.get('/delete-event/:id', (req, res) => {
    db.ref('events/' + req.params.id).remove();
    res.redirect('/');
});



router.post('/beneficiaries', (req, res) => { 

});

module.exports = router;
