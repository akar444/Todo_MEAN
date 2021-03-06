angular.module('toDoApp', [
	'ngRoute', 'toDoAppRouter', 'ToDoServices', 'UserService', 'Utility', 'header', 'login', 'signup', 'userProfile', 'AddTaskModal', 'todos', 'userForm', 'userAvatar'
]).controller('ToDoAppController', ['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {
	$rootScope.fields = {
		searchQuery:'',
		activeFilter: 'SHOW_ACTIVE'
	};
	$scope.loginOrRegister = $location.path() === '/login' ? 'Sign up' : 'Sign in';
	$scope.isLoggedIn = function() {
		return User.currentUser() && true;
	};
	$scope.accountNav = function(event) {
		if($location.path() === '/login') {
			$scope.loginOrRegister = 'Sign in';
			$location.path('/signup');
		} else {
			$scope.loginOrRegister = 'Sign up';
			$location.path('/login');
		}
	};
}]);