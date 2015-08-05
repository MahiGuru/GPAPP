angular.module("GoodPhood.Controller", ['GoodPhood.appCtrl'])
    .controller('AppCtrl', function ($scope, $ionicSlideBoxDelegate, AccessScope) {
        //Storing All Scopes into one service..
        AccessScope.store('AppCtrl', $scope);
        $scope.orderId = "";
        $scope.tableId = "";
        $scope.userId = 1;
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
        
    
        $scope.message = "asfasfasf";
           
            $scope.$watch('message', function(newValue){
                console.log(newValue)
                AccessScope.store('message', $scope.message);  
            //Storing All Scopes into one service..
            }, true)



    });
