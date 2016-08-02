view.add({
    name: 'ls-submit',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element, container) {
        var target = element.dataset['lsSubmit'];

        console.log('elements', element.elements, element.elements.length);


        element.addEventListener('submit', function(event) {
            event.preventDefault();
            container.get('form').set(element);
            var route = container.get('router').match(target);
            console.log(route);
            //container.get('messages').add('Saved Successfully!', 2.5);
            /**
             * 1. Get list of parameters
             * 2. Sort parameters by function signature
             * 3. Apply parameters to function and execute it
             */
        });

/*
 http://codereview.stackexchange.com/questions/13443/jquery-plugin-node-tojson-convert-html-form-to-js-object

 $.fn.toJSO = function() {

     if(!this.children('[name]').length) return this.val();
     //element.elements;

     var jso = new Object();

     this.children('[name]').each(function() {

         var name = $(this).attr('name');
         var type = $(this).attr('type');

        if($(this).siblings("[name="+name+"]").length) {

            if( type == 'checkbox' && !$(this).prop('checked')) return true;
            if( type == 'radio' && !$(this).prop('checked')) return true;

            if(!jso[name]) jso[name] = [];

            jso[name].push($(this).toJSO());

        }
        else {
            jso[name] = $(this).toJSO();
        }

     });

     return jso;
 };


*/

        //element.nodeName
    }
});