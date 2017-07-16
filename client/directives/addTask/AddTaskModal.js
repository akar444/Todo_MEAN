angular.module('AddTaskModal', [])
	.directive('addTodo', function() {
		return {	
			templateUrl: 'directives/addTask/AddTask.html',	
			restrict: 'E',
			controller: ['$scope', '$route', '$location', 'Utils', 'ToDos', 'User', function($scope, $route, $location, Utils, ToDos, User) {
							$scope.todo = {
								text: '',
								desc: ''
							};
							$scope.errors = {
								text: ''
							};
							$scope.validateFormField = function(event) {
								var inpElem = $(event.currentTarget);
								$scope.errors  = Utils.validateFormField(inpElem, $scope.errors);
							};
							$scope.addToDo = function(event) {
								var i,
									inpFields = Object.keys($scope.errors);
								$scope.errors = Utils.validateForm(inpFields, $scope.errors);
								if(Utils.checkIfAllKeysEmptyObj($scope.errors)) {
									$scope.todo.completed = false;
									$scope.todo.cBy = User.currentUser()._id;
									$scope.todo.cAt = new Date().getTime();
									ToDos.add({todo: $scope.todo}).
										then(function(res) {
											$scope.todo = {};
											$('#add-task-modal').modal('hide');
											$route.reload();
										});
								}
							}
						}]
		}
	});