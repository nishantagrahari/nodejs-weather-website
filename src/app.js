const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express=require("express");
const hbs=require('hbs');

const port = process.env.port || 3000;  // making environment variable for heoku and 3000 for local machine.

const app=express();

//defining path for different files
const directory=path.join(__dirname,'../public');
const viewPath= path .join(__dirname,'../templates/views');
const partialsPath=path .join(__dirname,'../templates/partials');


//setup view engine
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(directory));


//configuration for different routes

/*app.get('',(req,res)=>{
 res.send("hello nishant");
 });*/

app.get('',(req,res)=>{    //for index route
   res.render('index',{
      title:'Weather',
      name:'Nishant Agrahari'
   })
})

app.get("/help",(req,res)=>{   //for help route
    res.render('help',{
       title:'How can i help you?',
       name:'Nishant Agrahari'
      })
});

app.get("/weather",(req,res)=>{
   if(!req.query.address){
      return res.send('you must provide query address');
   }
   console.log(req.query.address);
   geocode(req.query.address, (data, error) => {
      if (error) {
         return res.send({error:error}); 
         }
         
         forecast(data.latitude, data.longtitude, (forecastdata, error) => {
           if (error) {
             return res.send({error:error});
           }
           res.send({
              location:data.location,
              forecast:forecastdata
         
             });
         });   
      })
   });

app.get("/about",(req,res)=>{
   res.render('about',{
      title:'About me',
      name:'Nishant Agrahari'
   })
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
     title:'404',
     errorMessage:'Help page not found',
     name:'Nishant Agrahari'
  })
});

app.get('*',(req,res)=>{  
   res.render('404',{
   title :'404',
   errorMessage:'Page not found',
   name :'Nishant Agrahari'
   })
});

app.listen(port,()=>{

    console.log("server connected");
 });