define(['http'],function(Services){

    function weatherAPI(){
        var self = this;
        self.api_key = "daaa97e688d62fff6164737e0c4d3f2a";
        self.units = "imperial";
        self.api_url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}";
        self.days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

        self.parseJSONResponse = function(response){

            var list = response.list;
            var data = {
                title   : [response.city.name,response.city.country].join(','),
                temp    : Math.ceil(list[0].temp.day),
                image   : "http://openweathermap.org/img/w/"+list[0].weather[0].icon+".png",
                desc    : list[0].weather[0].description,
                list    : []
            };
                
            
            list.shift();
            list.forEach(function(info){
                data.list.push({
                    day : self.days[new Date(info.dt * 1000).getDay()],
                    min : Math.round(info.temp.min),
                    max : Math.round(info.temp.max)
                })
            })    

            return data;
        }.bind(this);
    }

    weatherAPI.prototype.getInfo = function(obj,infoCallback){

        var url = (this.api_url + '&appid='+ this.api_key + '&units='+ this.units).replace('{lat}',obj.lat).replace('{lon}',obj.lon);
        
        var callback = function(xhr){
            var response = xhr.responseText;
            if(response){
                response = JSON.parse(response);
                infoCallback(this.parseJSONResponse(response));
            }
        }.bind(this);

        Services.get(url,callback);
        
    }

    return new weatherAPI();
})
