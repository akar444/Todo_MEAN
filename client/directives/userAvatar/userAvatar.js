angular.module('userAvatar', [])
	.directive('userAvatar', function() {
		return {	
			templateUrl: 'directives/userAvatar/userAvatar.html',	
			restrict: 'E',
			scope: {},
			controller: ['$scope', 'User', function($scope, User) {
							$scope.currentUser = User.currentUser();
							$scope.toggleProfilePopover = function(event) {
						    	$(event.currentTarget).parents('.user-account').toggleClass('opened');
							};
						}]
		}
	});