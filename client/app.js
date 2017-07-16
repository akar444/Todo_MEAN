angular.module('toDoApp', [
	'ngRoute', 'toDoAppRouter', 'ToDoServices', 'UserService', 'Utility', 'header', 'login', 'signup', 'userProfile', 'AddTaskModal', 'todos', 'userForm', 'userAvatar'
]).controller('ToDoAppController', ['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {
	$rootScope.fields = {
		searchQuery:'',
		activeFilter: 'SHOW_ACTIVE'
	};
	$scope.isLoggedIn = function() {
		return User.currentUser() && true;
	};
	$scope.accountNav = function(event) {
		if($location.path() === '/login') {
			$(event.currentTarget).text('Sign in');
			$location.path('/signup');
		} else {
			$(event.currentTarget).text('Sign up');
			$location.path('/login');
		}
	};
}]);