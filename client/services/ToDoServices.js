angular.module('ToDoServices', []).factory('ToDos', ['$http', 'User', function($http, User) {
    return {
        get : function() {
            return $http.get('/api/todos', {
              headers: {
                Authorization: 'Bearer '+ User.getToken()
              }
            });
        },
        add : function(todoObj) {
            return $http.post('/api/todos', todoObj);
        },
        updateTodo: function(todoObj) {
            return $http.post('/api/updateTodo', todoObj);
        },
        deleteTodo: function(todoObj) {
            return $http.post('/api/removeTodo', todoObj);
        }
    }       

}]);
