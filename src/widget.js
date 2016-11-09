(function(){
    //set the server where the files are hosted
    var basePath = (window.location.port !== '3005')?'http://muthuvijay.com/weather/widget/':'';

    //load CSS
    var styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', basePath+'styles/widget.css');
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
                api : basePath + "js/weather-api",
                app : basePath + "js/weather-app",
                http: basePath + "js/weather-http",
                dom: basePath + "js/weather-dom"
            }
        });

        require(['api','app','http','dom'],function(weatherAPI,widget,http,dom){

            widget.init();

        });
    }
    


}())



