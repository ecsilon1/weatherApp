//jshint esversion:6

const express=require('express');
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query=req.body.cityName;
  const units=req.body.unit;
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +  process.env.OPEN_API+ "&units=" + units;
    https.get(url, function(response){
      response.on("data", function(data){
        const weather=JSON.parse(data);
        const description=weather.weather[0].description;
        const temp=weather.main.temp;
  const icon=weather.weather[0].icon;
  const image="<img src=https://openweathermap.org/img/wn/" + icon +".png>";

        res.write("<h1>The temperature in " + query + " is " + temp + " degrees</h1>");
        res.send();
      });
    });
});











app.listen(3000, function(){
  console.log("Server started on port 5000");
});
