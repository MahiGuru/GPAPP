angular.module("GoodPhood.appCtrl", ['GoodPhood.Services'])
.controller('loginCtrl', function($scope){

})
.controller('menuCtrl', function($scope, appService){
    appService.gpService("create/1/1/1", "GET", null).then(function(resp){
        $scope.sampleMenuData = resp; 
    
    });
    
    
}).controller('reviewCtrl', function($scope){
    $scope.reviewData = "Scope from Review";
});