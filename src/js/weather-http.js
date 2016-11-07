define(function(){
    function Services(){
    
    function getHTTPRequest(){
        try {
            return new XMLHttpRequest();
        }catch(e){}
        try {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }catch(e){}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }catch(e){}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }catch(e){}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e){}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){}
        return null;
    }

    function getHeaderConfig() {
        
        var config = {
            dataType: 'json',
            headers: {
            }
        }

        return config;
        }

    //Http get 
    function get(url,callback){
        var xhr = getHTTPRequest();
            xhr.open('GET',url,true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200 && xhr.status != 304) {
                    return;
                }
                callback(xhr);
            }
            xhr.send();
    }

    
    //Http Post
    function post(url,data){
        
    }
    
    //Http put 
    function put(url,data){

    }
    //Http delete 

    function _delete(url){

    }
    
    return {
        get : function(url,callback){ get(url,callback)},
        put : function(url,data){ return put(url,data)},
        post : function(url,data){return post(url,data)},
        remove : function(url){ return _delete(url)},
    }
}

return new Services;  
});

