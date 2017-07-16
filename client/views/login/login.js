angular.module('login', [])
	.controller('LoginController', ['$scope', '$location', 'Utils', 'User', function($scope, $location, Utils, User) {
		$scope.user = {
			email: '',
			password: ''
		};
		$scope.errors = {
			email: '',
			password: ''
		};
		$scope.validateFormField = function(event) {
			var inpElem = $(event.currentTarget);
			$scope.errors  = Utils.validateFormField(inpElem, $scope.errors);
		};
		$scope.login = function() {
			var i,
				inpFields = Object.keys($scope.errors);
			$scope.errors = Utils.validateForm(inpFields, $scope.errors);
			if(Utils.checkIfAllKeysEmptyObj($scope.errors)) {
				User.login($scope.user)
					.then(function(res) {
						if(res.data.token) {
							User.saveToken(res.data.token);
							$location.path('/todos');
						} else {
							$scope.errors[res.data.field] = res.data.message;
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		};
	}]);