angular.module('todos', []).
	controller('ToDosController', ['$rootScope', '$scope', '$location', 'filterTodosFilter', 'ToDos', 'User', function($rootScope, $scope, $location, filterTodosFilter, ToDos, User) {
		$scope.todos = [];
		if(User.currentUser()) {
			
		ToDos.get()
			.then(function(res) {
				if(res.data.length) {
	  			   $scope.todos = res.data;
				} else {
				   $('#add-task-modal').modal('show');
				}
			});
		}


		$scope.showTodos = function() {
			return filterTodosFilter($scope.todos, $rootScope.fields.activeFilter);
		};

		$scope.completeTodo = function(todoId) {
			var updateObj = {
				_id: todoId,
				completed: true
			};
			ToDos.updateTodo({todo: updateObj}).
				then(function(res) {
					for(var i=0; i<$scope.todos.length; i++) {
						if($scope.todos[i]._id === todoId) {
							$scope.todos[i].completed = true;
							break;
						}
					}
				});
		};
		$scope.deleteTodo = function(todoId) {
			var i;
			ToDos.deleteTodo({_id: todoId}).
				then(function(res) {
					for(i=0; i<$scope.todos.length; i++) {
						if($scope.todos[i]._id === todoId) {
							break;
						}
					}
					$scope.todos.splice(i, 1);
				}).catch(function(err) {
					console.log(err);
				});
		};
	}])
	.filter('filterTodos', function() {
		return function(todos, filter) {
			var filteredTodos;
			switch(filter) {
				case 'SHOW_ACTIVE':
					filteredTodos = todos.filter(function(todo) {
						return !todo.completed;
					});
					break;
				case 'SHOW_COMPLETED':
					filteredTodos = todos.filter(function(todo) {
						return todo.completed;
					});
					break;
				default:
					filteredTodos = todos;
			}
			return filteredTodos;
		}
	});