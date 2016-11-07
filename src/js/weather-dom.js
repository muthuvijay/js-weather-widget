define(function(document){

    function DOM(){

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
                this.element.innerText(text);
                return this;
            },

            appendDOM : function(container){
                document.getElementById(container).appendChild(this.element);
            }

        }



    }

    return new DOM();
}(document))