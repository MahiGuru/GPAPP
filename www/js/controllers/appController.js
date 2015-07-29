angular.module("GoodPhood.appCtrl", ['GoodPhood.Services'])
.controller('loginCtrl', function($scope){

})
.controller('menuCtrl', function($scope, appService){
    appService.gpService("create/1/1/1", "GET", null).then(function(resp){
        $scope.sampleMenuData = resp;
        $scope.sections = resp.menu.Sections;
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        /*$scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
          */

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
    
    });
    
    
}).controller('reviewCtrl', function($scope){
    $scope.reviewData = "Scope from Review";
});