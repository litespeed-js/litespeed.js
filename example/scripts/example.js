(function() {
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
}());