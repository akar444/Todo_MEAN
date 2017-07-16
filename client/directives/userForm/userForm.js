angular.module('userForm', [])
	.directive('userForm', function() {
		return {	
			templateUrl: 'directives/userForm/userForm.html',	
			restrict: 'E',
			transclude: true,
			scope: {
				user: "=",
				errors: "=",
				formName: "="
			},
			controller: ['$scope', '$route', '$location', 'Utils', 'ToDos', 'User', function($scope, $route, $location, Utils, ToDos, User) {
				$scope.validateFormField = function(event) {
					var inpElem = $(event.currentTarget);
					if($scope.formName === 'userProfile' && ['password', 'cPassword'].indexOf(inpElem.attr('name')) !== -1) {
						return;
					}
					$scope.errors  = Utils.validateFormField(inpElem, $scope.errors);
				}	
			}]
		}
	});
