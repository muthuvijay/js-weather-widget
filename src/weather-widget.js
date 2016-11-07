var requirejs = {
    paths: {
        api : "js/weather-api",
        app : "js/weather-app",
        http: "js/weather-http",
        dom: "js/weather-dom"
    }
};

require.config(requirejs);

require(['api','app','http','dom'],function(weatherAPI,widget,http,dom){

    widget.init();

});



