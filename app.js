const express = require('express');

const app = express();
const bodyparder =require('body-parser');

var MongoClient = require('mongodb').MongoClient;


app.use(bodyparder.urlencoded({extended:true}));
app.use(bodyparder.json());

function dbconnect(){
    
    return new Promise((resolve,reject)=>{

        MongoClient.connect('mongodb://localhost:27017/student-api', function (err, client) {
        if (err) throw err

            var db = client.db('student-api')
            resolve(db);
        })
    })
}



var initialisepromis = dbconnect();

// post data

app.post('/stuentdata',(req,res)=>{
    let data = {
        Name:req.body.name,
        Dept:req.body.dept
    }
    initialisepromis.then(function(result){
        
        result.collection('students').insert(data,(err,dd)=>{
            
            console.log(dd);
            res.send(dd)
        })
    
    }).catch(reject=>{
        console.log(reject)
    })
})

// get data

app.get('/stuentdata',(req,res)=>{
initialisepromis.then(function(db1){
   
    db1.collection('students').find().toArray(function (err, result1) {
        if (err) throw err
    
        console.log(result1)
        res.send(result1)
      })

}).catch(reject=>{
    console.log(reject)
})
})

// delete data

app.delete('/stuentdata',(req,res)=>{
    initialisepromis.then(function(result){
        let data = {Name:req.body.name}
        result.collection('students').deleteMany(data,(err,dd)=>{
            
            console.log(dd);
            res.send(dd)
        })
    
    }).catch(reject=>{
        console.log(reject)
    })
})

// update data

app.put('/stuentdata',(req,res)=>{
    initialisepromis.then(function(result){
        let name = req.body.name;
        let dept = req.body.dept;
        console.log(name,dept)
        result.collection('students').updateMany({"Dept":dept,$set:{"Name":name}})
    
    }).catch(reject=>{
        console.log(reject)
    })
})


app.listen(5000,()=>{
    console.log('connected');
})