angular.module("GoodPhood.directive", [])
    /*
    .directive('myTabs', function(){
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller : function($scope){
                var panes = $scope.panes = [];
                $scope.select = function(){
                    angular.forEach(panes, function(pane){
                        pane.selected = false;
                    });
                    pane.selected = true;
                }
                $scope.addPane = function(pane){
                    if(panes.length == 0){
                        $scope.select(pane)
                    }
                    panes.push(pane);
                    
                } 
            },
            templateUrl : "js/directives/tabs.html"
        }
    }).directive('myPane', function(){
        return {
            require: '^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
              title: '@'
            },
            link : function(scope, element, attrs, tabsCtrl){
                console.log(tabsCtrl); 
                //tabsCtrl.addPane(scope);
                
            },
            template : '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
        
        }
        
    })














    */

.directive('myTabs', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: "AppCtrl",/*function ($scope, $ionicSlideBoxDelegate) {
                var panes = $scope.panes = [];
                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });

                    pane.selected = true;
                };

                this.addPane = function (pane) {
                    if (panes.length === 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };

                $scope.slideGoto = function (index) {
                     
                    $ionicSlideBoxDelegate.slide(index, 500);
                     
                    
                }
                console.log($scope);
            },*/
            templateUrl: 'js/directives/tabs.html'

        };
    })
    .directive('myPane', function () {
        return {
            require: '^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            link: function (scope, element, attrs, tCtrl) {
                console.log(tCtrl);
                tCtrl.addPane(scope);
            },
            template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
        };
    });
