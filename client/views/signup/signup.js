angular.module('signup', [])
	.controller('SignupController', ['$scope', '$location', 'Utils', 'User', function($scope, $location, Utils, User) {
		$scope.user = {
			fName: '',
			lName: '',
			email: '',
			password: '',
			cPassword: ''
		};
		$scope.errors = {
			fName: '',
			email: '',
			password: '',
			cPassword: ''
		};
		$scope.register = function(event) {
			var i,
				inpFields = Object.keys($scope.errors);
			$scope.errors = Utils.validateForm(inpFields, $scope.errors);
			if($scope.user.password !== $scope.user.cPassword) {
				$scope.errors.cPassword = 'Password must match';
			}
			if(Utils.checkIfAllKeysEmptyObj($scope.errors)) {
				User.signup($scope.user)
				.then(function(res) {
					console.log(res);
					$location.path('/login');
				})
				.catch(function(err) {
					if(err.status === 409) {
						$scope.errors.email = 'Email already exists';
					}
				});
			}
		}
	}]);