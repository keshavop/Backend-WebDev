const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: "Arpan",
//         phone: "1111111111"
//     },
//     {
//         name: "Tony Stark",
//         phone: "1234567890"
//     },
//     {
//         name: "Coding Ninjas",
//         phone: "12131321321"
//     }
// ]

// // passing contact to ejs
// app.get('/', function (req, res) {

//     contact.find({}, function (err, contactList) {
//         if (err) {
//             console.log("erroe in fetching contacts from db");
//             return;
//         }
//         return res.render('home', {
//             title: "Contact App",
//             contact_list: contactList
//         });
//     })

// })

// // pushing contact to json
// app.post("/create-contact", function (req, res) {

//     Contact.create({
//         name: req.body.name,
//         phone: req.body.phone
//     }, function (err, newContact) {
//         if (err) {
//             console.log('Error in creating a contact!');
//             return;
//         }
//         console.log('*****', newContact);
//         return res.redirect('back');
//     })
// })

// // express server
// app.listen(port, function (err) {
//     if (err) {
//         console.log("Error in running the server", err);
//     }
//     console.log("Yup!My Server is running on Port", port);
// });


// // deleting contact
// app.get('/delete-contact/', function (req, res) {
//     console.log(req.query);
//     let id = req.query.id

//     Contact.findOneAndDelete(id, function (err) {
//         if (err) {
//             console.log('error in deleting the object');
//             return;
//         }
//         return res.redirect('back');
//     })
// });


var contactList = [
    {
        name: 'Shivam',
        number: '123242'
    }, {
        name: 'Keshav',
        number: '653456'
    }, {
        name: 'Manwar',
        number: '76345'
    }
]

app.get('/',function(req,res){
    Contact.find({})
    .then(function(allcontacts){
        return res.render('home',{
            title:'Contact List',
            contact_list:allcontacts
        });
    })

    .catch(function(err){
        console.log("Got error on fetching data from db",err);
    });
});


app.post('/createcontact',function(req,res){
    Contact.create({
        name:req.body.name,
        number:req.body.number
    })
    //Using promise here
    .then(function(newcontact){
        console.log('*******',newcontact);
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('Error occured in create contact', err);
    });
});


app.get('/deletecontact', function (req, res) {
    console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id)
        .then(function () {
            console.log("Successful in deleting the contact");
            return res.redirect('back');
        })
        .catch(function (err) {
            console.log('Error in deleting data', err);
        });


});



app.listen(port, function (err) {
    if (err) {
        console.log("Error has been occured", err);
    }
    console.log("Server is running on Port:", port);
});