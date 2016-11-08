define(['api','dom'],function(weatherAPI,DOM){

var widget = (function(){

    var container = "js-weather-widget",
        sectionContainer = null;

    function init(){
        sectionContainer =  new DOM().create('section').addClass('widget-container abs-center');
        sectionContainer.appendDOM(container);  
        
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
            });
        }


    }

    function weatherInfoCB(data){
        if(data){
            
            //create title node
            new DOM().create('h1').addText(data.title).appendDOM(sectionContainer.element);
            
            //add current temp
            var currentTemp = new DOM().create('div').addClass('current-temp');
            var tempHtml = '<span><em>'+data.temp+' <sup>°</sup></em></span><span><figure><img src="'+data.image+'" alt="'+data.desc+'" /><figcaption><small> '+data.desc+'</small></figcaption></figure></span>';
            currentTemp.addHTML(tempHtml).appendDOM(sectionContainer.element);

            //add forecast temp
            var forecast = new DOM().create('ul').addClass('temp-list');
            data.list.forEach(function(item){
                var li = new DOM().create('li'),
                    html = '<span><strong>'+item.day+'</strong></span><span>'+item.max+' <sup>°</sup> / '+item.min+' <sup>°</sup></span>';

                    li.addHTML(html).appendDOM(forecast.element);
            });

            forecast.appendDOM(sectionContainer.element);
            
        }
    }

    function frameWrapper(){
       
    }

    return{
        init : init
    }

})();

return widget;

});



