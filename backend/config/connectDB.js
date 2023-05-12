const mongoose = require('mongoose');
const Role = require('../real_house/models/role')

async function connect() {
    //async co hanlde excep nên dùng try
    try 
    {
        await mongoose.connect('mongodb://localhost:27017/real_house')
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            // //initial role into db
            initial();
          })
          .catch(err => {
            console.error("Connection error", err);
            process.exit();
          });;
    } 
    catch (error) 
    {
        console.log("Connect mongodb is failed!");
    }
}

function initial() {
    Role.estimatedDocumentCount().then((count) => {
        console.log("Number row of role is "+ count);
        if(count === 0)
        {
            new Role
                ({
                    _id:0,
                    name: "user"
                })
                .save();
            console.log("Add data role user is success.");
            new Role(
                {
                    _id:1,
                    name: "admin"
                })
                .save();
            console.log("Add data role admin is success.");
        }
    })
    .catch((err) => console.error(err));;
}

module.exports = { connect };