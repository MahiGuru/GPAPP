angular.module("GoodPhood.appCtrl", ['GoodPhood.Services', 'GoodPhood.directive'])
    .controller('loginCtrl', function ($scope) {

    })
    .controller('menuCtrl', function ($scope, appService, $ionicSlideBoxDelegate) {
        $scope.venueMenu = '';

        appService.gpService("create/1/1/1", "GET", null).then(function (resp) {

            $scope.venueMenu = resp.menu.Sections;
            $scope.sampleMenuData = resp;
            //$scope.sections = resp.menu.Sections;
            $scope.OrderId = resp.orderId;
            /********* Collapsible ************/
                $ionicSlideBoxDelegate.update();

        });
       
    
        $scope.$watch("venueMenu", function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                $scope.sections = newValue;

            }

        })


    }).controller('reviewCtrl', function ($scope, appService) {
        $scope.reviewData = "Scope from Review";
        $scope.ordersResponce = '';
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
