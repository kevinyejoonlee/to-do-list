import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const maxItems = 7;
var count = 0;
var tasks = {}


app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.render("index.ejs", {
        ToDo: tasks,
        items: Object.keys(tasks).length
    });
})

app.post("/submit", (req, res) =>{
    var receivedText = req.body.InputText;

    if (Object.keys(tasks).length < 7){
        count ++;
        tasks[count] = receivedText ;
    }
    res.status(303).redirect('/');
});

app.post("/delete", (req, res) =>{
    var recivedItem = req.body.trash;
    delete tasks[recivedItem];
    res.status(303).redirect('/');
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))

// app.listen(port, () => {
//     console.log(`http://localhost:3000/`);
//   });
  

