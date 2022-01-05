const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./src/config/db.config");
const route = require("./src/routes")

const app = express();

app.use(cors());

//parser request of content-type -> application/json
app.use(bodyParser.json());

//parser request of content-type -> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./src/model");
const { count } = require("./src/model/user.model");
const Role = db.role;

//connect mongodb
db.mongoose.connect(dbConfig.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Successfully connect to MongoDB");
    initial();
})
.catch(err => {
    console.error("Connection fail: ", err);
    process.exit();
})

//init roles collection: add to db USER role and ADMIN roles
function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            new Role({
                name: "USER"
            }).save(err => {
                if(err){
                    console.log("error: ", err);
                }

                console.log("Added 'USER' to roles collection ");
            });

            new Role({
                name: "ADMIN"
            }).save(err => {
                if(err){
                    console.log("error: ", err);
                }

                console.log("Added 'ADMIN' to roles collection ");
            });
        }
    });
}


route(app);



const PORT = process.env.PORT || 9091;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})