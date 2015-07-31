angular.module("GoodPhood.Controller", ['GoodPhood.appCtrl'])
.controller('AppCtrl', function($scope){
    
        $scope.OrderId = "";
     /********* Collapsible ************/
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