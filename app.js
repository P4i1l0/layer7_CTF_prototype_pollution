const mysql = require('mysql2');
const express = require("express");
const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '21771126!',
    database: 'layer7',
    port: '3306'
});
const morgan = require('morgan')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/login.html");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    connection.query(`select * from users where id=? and pw=?`, [username, password], (error, results, fields) => {
        if (error) {
            res.send("error")
        } else {
            if (results.length > 0) {
                res.send(process.env.FLAG);
            } else {
                res.send("wrong");
            }
        }
    });
});

app.post("/test", (req, res) => {
    const obj = merge({}, req.body);
    const r = {};

    if (r.status == "test_code") {
        const flag = process.env.FLAG;
        r.__proto__.status = "";
        return res.send(flag);
    }
    return res.send("this is test code");
});

function merge(ob1, ob2) {
    for (let i in ob2) {
        if (ob1[i] !== null && typeof ob1[i] === "object" && ob2[i] !== null && typeof ob2[i] === "object") {
            merge(ob1[i], ob2[i]);
        }
        else {
            ob1[i] = ob2[i];
        }
    }
    return ob1;
}

connection.connect();
app.listen(3000, () => {
    console.log("server is running");
});