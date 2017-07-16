angular.module('toDoAppRouter', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController'
        }).
        when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'SignupController'
        }).
        when('/todos', {
            templateUrl: 'views/todos/todos.html',
            controller: 'ToDosController'
        }).
        when('/profile', {
            templateUrl: 'views/userProfile/userProfile.html'/*''*/,
            controller: 'UserProfileController'
        }).
        otherwise('/login');
    }])
    .run(['$rootScope', '$location', 'User', function($rootScope, $location, User) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if (User.currentUser() && ['/login', '/signup'].indexOf($location.path()) !== -1) {
                $location.path('/todos');
            }
        })
    }]);;