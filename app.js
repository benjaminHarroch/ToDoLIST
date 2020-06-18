//my package
const express=require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//connect express to my app
const app=express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine',  'ejs'); 
app.use(express.static('public')); 

//connect mongoose and creat a new datatbase for this app
mongoose.connect('mongodb://localhost:27017/TdDB', {useNewUrlParser: true,useUnifiedTopology: true})

//creat a shema for my databse 
const todoSchema=new mongoose.Schema({
    
    name:String
})

//creat the model that will collect all my data the model is like the "collections"
//and the data that i store will be need to be appropriate to this todoschema
const listTask = mongoose.model("listTask",todoSchema)

const firstItmen= new listTask({
   
    name:"go fuck"
})

const secondItmen= new listTask({
    
    name:"back from fuck"
})
const arrayTask=[firstItmen,secondItmen];

//i creat 2 document and store them in a array after i pass this array to insert in my db
/*listTask.insertMany(arrayTask,function(err){
    if(err){
        console.log(err)
    }else{
        console.log("this is success");
}
})*/

app.get('/',function(req,res){
    //i search my data in db
    listTask.find({},function(err,result){
        //check if exist data
        //in case that no so insert my data
        if(result.length===0){
            listTask.insertMany(arrayTask,function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log("this is success");
            }
            //in case that the data base is empty so i store 2 document and redirect my to 
            // '/' so after the firs time the db was full and now render the data
            res.redirect('/');
            })
        }
        //if exist data so render me this data
         else{
        if(err){
        console.log(err)
           }else{
              res.render('home',{Task:result})
           }
   }
 })
});

app.post('/',function(req,res){
   const newTask=req.body.newTask;

   const Nitem = new listTask({
       name:newTask
   });

       Nitem.save();
       res.redirect('/');
});



app.post('/delete',function(req,res){
   console.log(req.body.delete);
   const id=req.body.delete;
   listTask.findOneAndRemove(id, function(err){
       if(!err){
           console.log('this is success');
       res.redirect('/')
       }
    })   
    
});



app.listen(3000,()=>{
    console.log("the server is running");
});