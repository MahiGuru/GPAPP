// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('GoodPhood', ['ionic', "GoodPhood.Controller", "GoodPhood.Services"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('gp', {
        url : "/gp",
        abstract : true,
        templateUrl : "templates/masterPage.html",
        controller : "AppCtrl"
        
    }).state('gp.login', {
        url : "/login",
        views : {
            "viewContent" : {
                templateUrl : "templates/loginPage.html",
                controller : "loginCtrl"
            }
        }
    }).state('gp.table', {
        url : "/table",
        views : {
            "viewContent" : {
                templateUrl : "templates/tablePage.html" 
            }
        }
    
    }).state('gp.menu', {
        url : "/menu",
        views : {
            "viewContent" : {
                templateUrl : "templates/menuPage.html",
                controller : "menuCtrl"
            }
        }
    }).state('gp.review', {
        url : "/review",
        views : {
            "viewContent" : {
                templateUrl : "templates/reviewPage.html",
                controller : "reviewCtrl"
            }
        }
    }).state('gp.invoice', {
        url : "/invoice",
        views : {
            "viewContent" : {
                templateUrl : "templates/invoicePage.html"
            }
        }
    });
    
    
    
    $urlRouterProvider.otherwise("/gp/login");
});
