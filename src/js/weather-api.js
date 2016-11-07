define(['http'],function(Services){

    function weatherAPI(){

        this.api_key = "daaa97e688d62fff6164737e0c4d3f2a";
        this.units = "metric";
        this.api_url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}";
        this.days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

        this.parseJSONResponse = function(response){
            var data = {
                title   : [response.city.name,response.city.country].join(','),
                temp    : response.temp.day,
                image   : "http://openweathermap.org/img/w/"+response.weather[0].icon+".png",
                desc    : response.weather[0].description,
                list    : []
            };
                
            var list = response.list;
            list.shift();
            list.forEach(function(info){
                data.list.push({
                    day : this.days[new Date(info.dt * 1000).getDay()],
                    min : Math.round(info.temp.min),
                    max : Math.round(info.temp.max)
                })
            })    

            return data;
        }
    }

    weatherAPI.prototype.getInfo = function(obj,infoCallback){

        var url = (this.api_url + '&appid='+ this.api_key + '&units='+ this.units).replace('{lat}',obj.lat).replace('{lon}',obj.lon);
        
        function callback(xhr){
            var response = xhr.responseText;
            if(response){
                response = JSON.parse(response);
                infoCallback(this.parseJSONResponse(response));
            }
        }

        Services.get(url,callback);
        
    }

    return new weatherAPI();
})
