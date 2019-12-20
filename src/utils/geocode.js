const request= require('request');


const geocode=(address,callback)=>{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWljaGFlbDI3MTIxOTk4IiwiYSI6ImNrM3ZhbnUzejBra28zbG9wcThrbjBiaXoifQ.FfDH8aBLsItpNzwsyeDwCw';
    
    request({url:url2 , json:true},(error,response) =>{
        if(error){
            callback('undefined','unable to connect');
        }else if(response.body.features.length == 0){
            callback('undefined','Incorrect city name');
        }else{
            callback({
                latitude : response.body.features[0].center[1],
                longtitude : response.body.features[0].center[0],
                location: response.body.features[0]. place_name
            },undefined);
        }
    });
}

module.exports= geocode;