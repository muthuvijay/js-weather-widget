define(['api','dom'],function(weatherAPI,DOM){

var widget = (function(){

    var container = "js-weather-widget",
        sectionContainer = null;

    function init(){
        getLatLang();
        frameWrapper();
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
        
    }

    function frameWrapper(){
       sectionContainer =  DOM.create('section').addClass('widget-container abs-center')
       sectionContainer.appendDOM(container);
    }

    return{
        init : init
    }

})();

return widget;

});



