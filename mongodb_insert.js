var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/student-api', function (err, client) {

let db = client.db('student-api');

let data = {
    Name:"Vikash",
    Dept:"Msc"
}
db.collection('students').insert(data,(err,dd)=>{
console.log(dd)    


})

});

