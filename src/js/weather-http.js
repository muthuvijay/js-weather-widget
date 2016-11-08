/**
 * Services to call API via Ajax
 */
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

    //Http get 
    function get(url,callback){
        var xhr = getHTTPRequest();
            if(!xhr){
                console.error('No Ajax Support');
                return false;
            }
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
    function post(url,data){}
    
    //Http put 
    function put(url,data){}
    
    //Http delete 
    function _delete(url){}
    
    return {
        get : function(url,callback){ get(url,callback)},
        put : function(url,data,callback){ return put(url,data,callback)},
        post : function(url,data,callback){return post(url,data,callback)},
        remove : function(url,callback){ return _delete(url,callback)},
    }
}

return new Services;  
});

