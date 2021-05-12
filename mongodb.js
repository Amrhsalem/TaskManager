//CRUD create read update delete
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

const connectionURL ='mongodb://127.0.0.1:27017';
const databaseName ='task-manager';

MongoClient.connect(connectionURL,{ useNewUrlParser:true, useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('unable to connect to database!')
    }
    
    const db=client.db(databaseName);
    db.collection('tasks').deleteOne({description:'wash the dishes'})
        .then((result)=>{
            console.log(result.deletedCount)
        })
        .catch((error)=>{
            console.log(error)
        })
    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateMany({
    //     age:28
    // },{
    //     $inc:{age:1}})
    //     .then((result)=>{
    //         console.log(result)
    //     })
    //     .catch((error)=>{
    //         console.log('error')
    //     })
    
    // db.collection('tasks').findOne({_id: new mongodb.ObjectID("607e0f53fa168536f03b2f70")},(error,task)=>{
    //     if (error){
    //         return console.log('Error!!')
    //     }
    //     console.log(task)
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,task)=>{
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(task)
    // })


    // db.collection('users').insertOne({
    //     name:'Amr',
    //     age:27
    // },(error,result)=>{
    //     if (error){
    //         return console.log('unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'jen',
    //         age:'28'
    //     },
    //     {
    //         name:'john',
    //         age: 27
    //     }
    // ],(error,result)=>{
    //     if (error){
    //         return console.log('unable to insert documents')
    //     }
    //     console.log(result.ops);

    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'wash the dishes',
    //         completed: true
    //     },
    //     {
    //         description:'get groceries',
    //         completed: false
    //     },{
    //         description:'mow the lawn',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if (error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').findOne({name:'Amr'},(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })
})