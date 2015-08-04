angular.module("GoodPhood.appCtrl", ['GoodPhood.Services', 'GoodPhood.directive'])
    .controller('loginCtrl', function ($scope) {

    })
    .controller('menuCtrl', function ($scope, appService, $ionicSlideBoxDelegate, $interval, $state, $stateParams) {
        $scope.venueMenu = '';
        $scope.orderSummeryCount = "";

        //ON STATE CHANGE SUCCESS CALL BELOW METHOD
        /*$scope.$on("$stateChangeSuccess", function updatePage() {
            alert("from Menu Controller");
            $scope.page = $state.params.slug;
        });*/

        $scope.$watchCollection('$stateParams', function (newParams) {
           // alert("State Params page");
        });
        // IONIC VIEW STATUS
        $scope.$on('$ionicView.enter', function() { 
        })

        $scope.$on('$ionicView.leave', function() { 
            $interval.cancel(orderSummeryInterval)
        })
        alert($stateParams.venueId+ " == "+$stateParams.tableId +" == "+$stateParams.userId);
        appService.gpService("create/"+$stateParams.venueId+"/"+$stateParams.tableId+"/"+$stateParams.userId, "GET", null).then(function (resp) {
             alert("menu Service")
            console.log(resp);
           $scope.venueMenu = resp.menu.Sections;
           $scope.sampleMenuData = resp;
           //$scope.sections = resp.menu.Sections;
           $scope.OrderId = resp.orderId;
            /********* Collapsible ************/
           $ionicSlideBoxDelegate.update();

        });
        var addItemOrder = function(orderId, userId, itemId, qty, kotItemId, preference, viewHandler, errorHandler){
            var postData = { OrderId: orderId, UserId: userId, ItemId: itemId, Quantity: qty, 
                            KOTItemId: kotItemId, Preferences: '' }; 
            appService.gpService("addorupdate", "POST", postData).then(function(summery){
                 alert("CLICK success");
                viewHandler(summery);
                 //$scope.orderSummeryCount = summery
             }, function(){
                errorHandler();
            });
        }
    
        $scope.menuMinusClick = function(itemId, kotItemVal){
            var quantityItemVal = -1;
            addItemOrder($scope.orderId, $scope.userId, itemIdVal, quantityItemVal, kotItemVal, "", function(summery){
                
            }, function(){
            
            });
             
        };
    $scope.menuPlusClick = function(itemId, kotItemVal){
            var quantityItemVal = 1;
            addItemOrder($scope.orderId, $scope.userId, itemIdVal, quantityItemVal, kotItemVal, "", function(summery){
                
            }, function(){
            
            });
             
        };
         var orderSummeryInterval =  function(){
             appService.gpService("ordersummary/1/1", "GET", null).then(function(summery){
                // alert("success");
                 $scope.orderSummeryCount = summery
             });
         }
        $interval(orderSummeryInterval, 5000);

        $scope.$watch("orderSummeryCount", function (newValue, oldValue) {
            console.log("=== "+newValue);
            if (!angular.equals(newValue, oldValue)) {
                console.log("ORDER = "+newValue);
                $scope.orderSummery = newValue;
            }
        });
        $scope.orderSummeryClick = function(itemCount){
              if(itemCount >= 0){
                   //$state.go("gp.review");
                  $state.transitionTo("gp.review", null, { reload: true, inherit: false, notify: true });
              } else{
                  $state.transitionTo("gp.review", null, { reload: true, inherit: false, notify: true });
                  //$state.go("gp.table");
              }
        }
        $scope.$watch("venueMenu", function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.sections = newValue;

            }
        })


    }).controller('reviewCtrl', function ($scope, appService) {
        $scope.reviewData = "Scope from Review";
        $scope.ordersResponce = '';

        alert("Review page");
        appService.gpService("vieworder/1", "GET", null).then(function (viewOrderResponce) {
            $scope.ordersResponce = viewOrderResponce;
        })
        $scope.$watch("ordersResponce", function (newValue, oldValue) {
            //alert("We are in watch" + newValue)
            //alert($scope.ordersResponce); 
            if (!angular.equals(newValue, oldValue)) {
                $scope.reviewResponce = newValue;
                $scope.reviewItems = newValue.reviewItems;
                $scope.confirmedItems = newValue.confirmedItems;
            }
        })





    });
