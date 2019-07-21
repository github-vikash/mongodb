var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/student-api', function (err, client) {
  if (err) throw err

  var db = client.db('student-api')

  db.collection('students').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
