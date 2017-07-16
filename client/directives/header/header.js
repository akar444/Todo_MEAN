angular.module('header', [])
	.directive('header', function() {
		return {
			templateUrl: 'directives/header/header.html',	
			restrict: 'E',
			controller: ['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {
				$scope.filters = {
					'SHOW_ALL': 'All',
					'SHOW_ACTIVE': 'Active',
					'SHOW_COMPLETED': 'Completed'
				};
				$scope.goToTodos = function() {
					$scope.isLoggedIn && $location.path('/todos');
				};
				$scope.logout = function() {
					User.logOut();
				};
				$scope.hidePopover = function(event) {
					$('.user-account').removeClass('opened');
				};
				$scope.showActions = function() {
					if(User.currentUser() && $location.path() === '/todos') {
						return true;
					}
					return false;
				};
				$scope.setActiveFilter = function(event) {
					var targetElem = $(event.target),
						filter = targetElem.data('filter');
					$(event.currentTarget).find('li').removeClass('active');	
					targetElem.parents('li').addClass('active');
					$rootScope.fields.activeFilter = filter;
				};
				$scope.openSearch = function(event) {
					var inpElem = $(event.currentTarget).prev('input');
					if(inpElem.css('width') === '0px') {
						inpElem.addClass('opened');
						inpElem.focus();
					}
				};
				$scope.closeSearh = function(event) {
					var currentTarget = $(event.currentTarget);
					currentTarget.removeClass('opened');
				}
			}]
		}
	});