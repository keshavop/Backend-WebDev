const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// json of pre-defined contact
var contactList = [
    {
        name: "kiki",
        phone: "7857982609"
    },
    {
        name: "Iron Man",
        phone: "5698456966"
    },
    {
        name: "Thorr",
        phone: "567987349"
    }
]

// passing contact to ejs
app.get('/', function (req, res) {
    return res.render('home', {
        title: "Contact App",
        contact_list: contactList
    });
})

// pushing contact to json
app.post("/create-contact", function (req, res) {
    contactList.push(req.body);
    return res.redirect("/");
})

// express server
app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log("Yup!My Server is running on Port", port);
});


// deleting contact
app.get("/delete-contact/", function (req, res) {
    console.log(req.query);
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

    if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }

    return res.redirect("back");
})