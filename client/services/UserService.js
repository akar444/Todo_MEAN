angular.module('UserService', []).factory('User', ['$http', '$window', '$location', function($http, $window, $location) {

    return {
        signup : function(user) {
            return $http.post('/api/signup', user);
        },
        login : function(user) {
            return $http.post('/api/login', user);
        },
        getUserProfile : function(user) {
            return $http.get('/api/profile', {
              headers: {
                Authorization: 'Bearer '+ this.getToken()
              }
            });
        },
        updateUserProfile: function(user) {
            return $http.post('/api/profile', user, {
              headers: {
                Authorization: 'Bearer '+ this.getToken()
              }
            });
        },
        saveToken: function (token) {
            $window.localStorage['u-token'] = token;
        },
        getToken: function(token) {
            return $window.localStorage.getItem('u-token');
        },
        currentUser: function() {
          var uToken = this.getToken(),
              user,
              payload;
          if(uToken) {
            payload = uToken.split('.')[1];
            payload = $window.atob(payload);
            user = JSON.parse(payload);
            return {
              _id:  user._id, 
              email : user.email,
              fName : user.fName,
              lName : user.lName,
              name : user.name,
              avatar: user.avatar,
              color: user.color
            };
          }
          return false;
        },

        logOut: function() {
            return $http.get('/api/signout')
                      .then(function(res) {
                        $window.localStorage.removeItem('u-token');
                        $location.path('/login');
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
        }
    }       

}]);