define(function(){

    return function(){

        this.element = null;

        return{

            create : function(element){
                this.element = document.createElement(element);
                return this;
            },

            addClass : function(className){
                this.element.setAttribute('class',className);
                return this;
            },

            addText : function(text){
                this.element.innerText = text;
                return this;
            },

            addHTML : function(html){
                this.element.innerHTML = html;
                return this;
            },

            appendDOM : function(containerNode){
                if(document.getElementById(containerNode)){
                    document.getElementById(containerNode).appendChild(this.element);
                }else{
                    containerNode.appendChild(this.element);
                }
            },

            getElemById : function(element){
                return document.getElementById(element)
            }

        }
    }

});