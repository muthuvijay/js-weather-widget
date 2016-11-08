(function(){
    
    //load CSS
    var styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', 'styles/widget.css');
    document.getElementById('js-weather-widget').appendChild(styles);

    if (window.require === undefined) {
        var script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src",
            "http://requirejs.org/docs/release/2.3.2/minified/require.js");
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    main();
                }
            };
        } else {
            script.onload = main;
        }
        document.getElementById('js-weather-widget').appendChild(script);
    } else {
        main();
    }


    function main(){
        require.config({
            paths: {
                api : "js/weather-api",
                app : "js/weather-app",
                http: "js/weather-http",
                dom: "js/weather-dom"
            }
        });

        require(['api','app','http','dom'],function(weatherAPI,widget,http,dom){

            widget.init();

        });
    }
    


}())



