angular.module('Utility', []).factory('Utils', ['$http', '$window', '$location', function($http, $window, $location) {
    return {
        validateEmail: function(email) {
          var regEx = /^[-A-Za-z0-9~!$%^&*_=+}{\'?]+(\.[-A-Za-z0-9~!$%^&*_=+}{\'?]+)*(\+[A-Za-z0-9-]+)?@([A-Za-z0-9_][-A-Za-z0-9_]*(\.[-A-Za-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
              msg;
          if(!email) {
              msg = "Email is required";
          }else if(!(regEx.test(email))) {
              msg = 'Invalid email';
          }
          return msg;
        },
        validateFormField: function(inpElem, errorObj) {
          var msg,
            fieldName = inpElem.attr('name'),
            fieldValue = inpElem.val();
          switch(fieldName) {
            case 'fName':
              msg = !fieldValue ? 'First name is required' : '';
              break;
            case 'email':
              msg = this.validateEmail(fieldValue);
              break;
            case 'password':
              msg = !fieldValue ? 'Password is required' : (fieldValue.length < 8) ? 'Passowrd must be atleast 8 characters' : '';
              break;
            case 'cPassword':
              msg = !fieldValue ? 'Password is required' : '';
              break;
            case 'text':
              msg = !fieldValue ? 'Task name is required' : '';
              break;
            default:
              msg = '';
          }
          errorObj[fieldName] = msg;
          return errorObj;
        },
        validateForm: function(inpFields, errorObj) {
          var i,
              inpElem;
          for(i=0; i<inpFields.length; i++) {
            inpElem = $('[name="' + inpFields[i] + '"]');
            errorObj = this.validateFormField(inpElem, errorObj);
          }
          return errorObj;
        },
        checkIfAllKeysEmptyObj: function(obj) {
          var key,
              objCpy = JSON.parse(JSON.stringify(obj));
          for(key in objCpy) {
            if(!objCpy[key]) {
              delete objCpy[key];
            }
          }
          return Object.keys(objCpy).length === 0;
        }
    }       
}]);