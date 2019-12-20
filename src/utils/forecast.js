const request= require('request');

const forecast=(latitude,longitude,callback)=>{
 //  const url = 'https://api.darksky.net/forecast/caa145268300e2b080f8aa2f10dbc700/37.8267,-122.4233?lang=hi';
   
   const url = 'https://api.darksky.net/forecast/caa145268300e2b080f8aa2f10dbc700/'+ latitude +','+ longitude +'?lang=hi&units=si';

   request({url:url,json:true},(error,response) => {

    if(error){
        callback('undefined','unable to connect');
    }else{
        callback("current temperature is "+ response.body.currently.temperature+" summary is "+ response.body.currently.summary,undefined);
    }
});

}

module.exports=forecast;