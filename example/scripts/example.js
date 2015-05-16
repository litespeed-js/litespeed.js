(function(window) {
    "use strict";

    var example = app();

    example.router
        .state('/index.html', '/pages/home.html', function() {})
        .state('/pages/about.html', '/pages/about.html', function() {})
        .state('/pages/article.html', '/pages/article.html', function() {})
        .state('/pages/example.html', '/pages/example.html', function(element, container) {
            var service = container.get('tasks');

            setInterval(function() {Object.path(service, 'title', '3s Interval Overtake');}, 3000);
        })
    ;

    example.container
        .register('tasks', function() {
             return {
                 title: 'Task Title',
                 test: {
                     new: 'title',
                     nested: {
                         value: 'empty'
                     }
                 },
                 list: [
                    'This is just my first task',
                    'This is just another test adding a second task',
                    'What do you think about this test'
                 ],
                 add: function(task) {
                     this.list.push(task);
                 }
             }
         }, true)
     ;

    example.run(window);

}(window));


/*

 sizeof.js

 A function to calculate the approximate memory usage of objects

 Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
 the terms of the CC0 1.0 Universal legal code:

 http://creativecommons.org/publicdomain/zero/1.0/legalcode

 */

function sizeof(_1){
    var _2=[_1];
    var _3=0;
    for(var _4=0;_4<_2.length;_4++){
        switch(typeof _2[_4]){
            case "boolean":
                _3+=4;
                break;
            case "number":
                _3+=8;
                break;
            case "string":
                _3+=2*_2[_4].length;
                break;
            case "object":
                if(Object.prototype.toString.call(_2[_4])!="[object Array]"){
                    for(var _5 in _2[_4]){
                        _3+=2*_5.length;
                    }
                }
                for(var _5 in _2[_4]){
                    var _6=false;
                    for(var _7=0;_7<_2.length;_7++){
                        if(_2[_7]===_2[_4][_5]){
                            _6=true;
                            break;
                        }
                    }
                    if(!_6){
                        _2.push(_2[_4][_5]);
                    }
                }
        }
    }
    return _3;
};
