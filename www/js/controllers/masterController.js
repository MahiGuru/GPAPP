angular.module("GoodPhood.Controller", ['GoodPhood.appCtrl'])
    .controller('AppCtrl', function ($scope, $ionicSlideBoxDelegate) {

        $scope.OrderId = "";
        /********* Collapsible ************/
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
        $scope.myActiveSlide = 0;
        $scope.slidePrevious = function () {

            $ionicSlideBoxDelegate.previous();
        }

        $scope.slideNext = function () {
            $ionicSlideBoxDelegate.next();
        }

        ///TABS METHOD ;
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
            $scope.myActiveSlide = index;
            console.log($scope.myActiveSlide);
            $ionicSlideBoxDelegate.slide(index, 500);

        }
        $scope.slideHasChanged = function ($index) {
               $scope.myActiveSlide = $index;
        };




    });
