   var appControllers = angular.module("GoodPhood.appCtrl", ['GoodPhood.Services', 'GoodPhood.directive']);
   appControllers.controller('loginCtrl', function ($scope, AccessScope) {
       $scope.user = {
           mobileNumber: "",
           deviceNumber: "",
           firstName: "",
           lastName: "",
           email: "",
           userNumber: ''
       };

       //SETTING AND GETTING USER VALUE **** WATCHING ******
       $scope.$watch('user.userNumber', function (newValue, oldValue) {
           console.log(newValue);
           AccessScope.store('userNumber', newValue);
           console.log("From Access Scope = " + AccessScope.get('userNumber'));
       }, true);

   });
   appControllers.controller('tableCtrl', function ($scope, AccessScope) {
       $scope.tableDetails = {
           qrNumber: "",
           orderNumber: "",
           tableNumber: "",
           userNumber: ""
       };
       //SETTING AND GETTING TABLE RELATED VALUES **** WATCHING ******
       $scope.$watch('tableDetails.qrNumber', function (newValue, oldValue) {
           console.log(newValue.charAt(0));
           if (newValue.length == 1) {
               $scope.tableDetails.qrNumber = newValue.replace(/^[0-9]/g, newValue + "#");
           }
           if (newValue.length == 3 && newValue.indexOf("#") >= -1) {
               $scope.tableDetails.orderNumber = newValue.charAt(0);
               $scope.tableDetails.tableNumber = newValue.charAt(2);
               $scope.tableDetails.userNumber = AccessScope.get('userNumber') || 1;

               AccessScope.store('tableDetails', $scope.tableDetails);
               console.log(AccessScope.get('tableDetails'));
           }
       }, true);
   })
   appControllers.controller('menuCtrl', function ($scope, appService, $ionicSlideBoxDelegate, $interval, $state, $stateParams, AccessScope) {

       //Storing All Scopes into one service..
       AccessScope.store('menuCtrl', $scope);

       $scope.venueMenu = '';
       $scope.orderSummeryCount = "";

       /**** 
            TEMPORARY 
       ****/
       $scope.orderInfo = {
           qrNumber: "",
           orderNumber: "1",
           tableNumber: "1",
           userNumber: "1"
       };

       /**** 
            /TEMPORARY 
       ****/

       //$scope.orderInfo = AccessScope.get('tableDetails');

       console.log($scope.orderInfo);

       $scope.$watch('orderInfo', function (newValue) {
           console.log(" ------ orderinfo ------- ");
           console.log(newValue)
               //AccessScope.store('orderId', newValue);   
       })

       $scope.$watchCollection('$stateParams', function (newParams) {
           // alert("State Params page");
       });
       // IONIC VIEW STATUS
       $scope.$on('$ionicView.enter', function () { /* TODO :  loading view time do your logic */ });

       appService.gpService("vieworder/" + $scope.orderInfo.orderNumber, "GET", null).then(function (viewOrderResponce) {
           $scope.ordersResponce = viewOrderResponce;
           $scope.reviewItems = viewOrderResponce.reviewItems;
           $scope.confirmedItems = viewOrderResponce.confirmedItems;
       })
       
       if ($scope.orderInfo != undefined) {
           $scope.menuPath = "create/" + $scope.orderInfo.orderNumber + "/" + $scope.orderInfo.tableNumber + "/" + $scope.orderInfo.userNumber;
           console.log($scope.menuPath);
       }

       //--------------------- MENU SERVICE--------------------
       appService.get($scope.menuPath, null).then(function (resp) {
           alert("menu Service")
           console.log(resp);
           $scope.venueMenu = resp.menu.Sections;
           $scope.sampleMenuData = resp;
           //$scope.sections = resp.menu.Sections;
           $scope.orderId = resp.orderId;

           /********* Collapsible ************/
           $ionicSlideBoxDelegate.update();

       });

       // ~~~~~~ WATCHING MENU SERVICE AND ASSIGNING TO SECTIONS SCOPE
       $scope.$watch("venueMenu", function (newValue, oldValue) {
           if (!angular.equals(newValue, oldValue)) {
               $scope.sections = newValue;

           }
       });

       $scope.$watch("ordersResponce", function(newValue, oldValue){
           
            
       }, true);
       $scope.$watch("sections", function (newValue, oldValue) { 
           //$scope.ordersResponce 
           angular.forEach($scope.reviewItems, function(value, key) {
              console.log(key + ' Review : -------- ' + value);
            });
           
           angular.forEach($scope.confirmedItems, function(value, key) {
              console.log(key + ' Confirm : -------- ' + value);
            });
           $($scope.sections).each(function (i, section) {  
               $(section.Categories).each(function (k, category) { 
                   $(category.Items).each(function (m, item) {
                       $scope.sections[i].Categories[k].Items[m]["ItemCount"] = 0;
                       console.log($scope.sections[i].Categories[k].Items[m]);
                   });
               });
           });

       });

       //---------------- ADD ITEM SERVICE-----------------
       var addItemOrder = function (orderId, userId, itemId, qty, kotItemId, preferences, viewHandler, errorHandler) {
           var postData = {
               OrderId: orderId,
               UserId: userId,
               ItemId: itemId,
               Quantity: qty,
               KOTItemId: null,
               Preferences: null
           };
           appService.post("addorupdate", postData).then(function (summery) {
               alert("CLICK success");
               viewHandler(summery);
               //$scope.orderSummeryCount = summery
           }, function () {
               alert("some thing went wrong....")
               errorHandler();
           });
       };
       //~~~~~~~~~~~~~~ SPINNER MINUS METHOD
       $scope.menuMinusClick = function (itemIdVal, kotItemVal) {
           var quantityItemVal = -1;
           addItemOrder($scope.orderId, $scope.userId, itemIdVal, quantityItemVal, kotItemVal, "", function (summery) {

           }, function () {

           });

       };
       //~~~~~~~~~~~~~~ SPINNER PLUS METHOD
       $scope.menuPlusClick = function (itemIdVal, kotItemVal) {
           var quantityItemVal = 1;
           addItemOrder($scope.orderId, $scope.userId, itemIdVal, quantityItemVal, kotItemVal, "", function (summery) {

           }, function () {

           });

       };
       var orderSummeryInterval = '';
       orderSummeryInterval = function () {
               appService.get("ordersummary/1/1", null).then(function (summery) {
                   // alert("success");
                   $scope.orderSummeryCount = summery
               });
           }
           //--------------------- ORDER SUMMERY SERVICE-------------------- 
       $interval(function () {
           orderSummeryInterval();
       }, 5000);

       // ~~~~~ WATCHING ORDER SUMMERY COUNT
       $scope.$watch("orderSummeryCount", function (newValue, oldValue) {
           console.log("order");
           if (!angular.equals(newValue, oldValue)) {
               console.log(oldValue);
               console.log(newValue);
               console.log("ORDER = " + newValue);
               $scope.orderSummery = newValue;
           }
       });

       // ~~~~~ ORDER SUMMERY COUNT CLICK METHOD
       $scope.orderSummeryClick = function (itemCount) {
           if (itemCount >= 0) {
               $state.go("gp.review", {
                   "orderId": 1
               });
           } else {
               $state.go("common.table");
           }
       };

       $scope.$on('$ionicView.leave', function () {
           /* TODO :  Complete view  time do your logic */
           $interval.cancel(orderSummeryInterval);
       });

   });
   appControllers.controller('reviewCtrl', function ($scope, appService, $stateParams, AccessScope) {

       //Storing All Scopes into one service..
       AccessScope.store('menuCtrl', $scope);

       $scope.reviewData = "Scope from Review";
       $scope.ordersResponce = '';


       alert("Review page");
       alert(AccessScope.get('AppCtrl').userId);

       appService.gpService("vieworder/" + $stateParams.orderId, "GET", null).then(function (viewOrderResponce) {
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
       });
   });