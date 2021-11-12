const {MongoClient} = require('mongodb');

async function main(){
    
    const uri = "mongodb+srv://sai:Momdad%4016@cluster0.zhry2.mongodb.net/newyork?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
    
        // Make the appropriate DB calls
        console.log(uri);
        console.log("DBconnected");
        await listDatabases(client);
        await state(client);
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}

main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function state(client){
    const result=await client.db('india').collection("city").findOne();
    if(result){
        console.log(result);


    }else{
        console.log('not found');
    }
}




// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://sai:Momdad%4016@cluster0.zhry2.mongodb.net/WorldCities?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("cities").collection("city");
//   console.log("db connected")
//   // perform actions on the collection object


//   await  listDatabases(client);

//   client.close();
// });

//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost/EmployeeDB';

// MongoClient.connect(uri, function(err, db) {

//     var cursor = db.collection('Locations').find();

//     cursor.each(function(err, doc) {

//         console.log(doc);

//     });
// });


