/**
 * Widget APP to get user location via geolocation API and display Weather info for that location
 */

define(['api','dom'],function(weatherAPI,DOM){

var widget = (function(){

    var container = "js-weather-widget", //Widget Container
        sectionContainer = null,
        defaultLatLong = {
            lat : 33.7490,
            lon : -84.3880
        };

    function init(){
        //Frame the Wrapper UI container
        sectionContainer =  new DOM().create('section').addClass('widget-container abs-center').addText('Loading...');
        sectionContainer.appendDOM(container);  
        //Get user location
        getLatLang();
    }

    function getLatLang(){
        //fetch lat lang from the user location
        if(!!navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                weatherAPI.getInfo({
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                },weatherInfoCB);
            },function(){
                weatherAPI.getInfo(defaultLatLong,weatherInfoCB); 
            });
        }
    }

    //get weather info callback to parse & frame HTML
    function weatherInfoCB(data){
        if(data){
            sectionContainer.addText(null);
            //create title node
            new DOM().create('h1').addText(data.title).appendDOM(sectionContainer.element);
            
            //add current temp
            var currentTemp = new DOM().create('div').addClass('current-temp');
            var tempHtml = '<span><strong>'+data.temp+'<sup>°F</sup></strong></span><span><figure><img src="'+data.image+'" alt="'+data.desc+'" /><figcaption><small> '+data.desc+'</small></figcaption></figure></span>';
            currentTemp.addHTML(tempHtml).appendDOM(sectionContainer.element);

            //add forecast temp
            var forecast = new DOM().create('ul').addClass('temp-list');
            data.list.forEach(function(item){
                var li = new DOM().create('li'),
                    html = '<span><strong>'+item.day+'</strong></span><span>'+item.max+'<sup>°</sup>/'+item.min+'<sup>°</sup></span>';

                    li.addHTML(html).appendDOM(forecast.element);
            });

            forecast.appendDOM(sectionContainer.element);
            
        }
    }
    
    return{
        init : init
    }

})();

return widget;

});



