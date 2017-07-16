angular.module('userProfile', []).
	controller('UserProfileController', ['$scope', '$location', 'Utils', 'ToDos', 'User', function($scope, $location, Utils, ToDos, User) {
		$scope.user = {};
		$scope.errors = {
			fName: '',
			email: '',
			password: '',
			cPassword: ''
		};
		if(User.currentUser()) {
			User.getUserProfile()
				.then(function(res) {
					if(res.data) $scope.user = res.data;
			});
		} else {
			$location.path('/login');
		}
		$scope.updateProfile = function() {
			var i,
				inpFields = Object.keys($scope.errors);
			$scope.errors = Utils.validateForm(inpFields, $scope.errors);
			if(!$scope.user.password) {
				$scope.errors.password = '';
				$scope.errors.cPassword = '';
			}
			if($scope.user.password !== $scope.user.cPassword) {
				$scope.errors.cPassword = 'Password must match';
			}
			if(Utils.checkIfAllKeysEmptyObj($scope.errors)) {
				User.updateUserProfile($scope.user)
					.then(function(res) {
						if($scope.user.password) {
							User.logOut();
						} else {
							
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		}
	}]);