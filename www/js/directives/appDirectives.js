angular.module("GoodPhood.directive", [])
    .directive('tree', function ($compile) {
        return {
            restrict: 'E',
            terminal: true,
            scope: {val: '=', parentData: '='},
            link: function (scope, element, attrs) {
                var template = '<h2>{{val.SectionName}}</h2>';
                console.log(scope.val);
                if (angular.isArray(scope.val.Categories)) {
                    template += '<ul class="indent"><li ng-repeat="item in val.Categories">' +'<tree val="item" parent-data="val.Categories"></tree></li></ul>';
                }
                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    });











/*.directive('templateCode', function(){
          return {
              restrict : "A",
              controller : function(){},
              compile : function(element){
                  element.removeAttr("template-code");
                  var templateCode = element.parent().html().trim();

                  return function(scope, iElement, iAttrs, controller){
                       controller.templateCode = templateCode;
                  }
              }
          }

    }).directive("nestedItem", ['$compile', function($compile){
        return {
            restrict : "A",
            require : "^templateCode",
            link : function(scope, element, iAttr, controller){
                console.log(scope.item.Categories);
                   if(scope.item.Categories) {
                       scope.sections = scope.item.Categories;
                         var html = $compile(controller.templateCode)(scope)
                       element.append("<h2>HTML BREAK</h2>");
                       element.append(html);

                   }
            }
        }
    }]).directive("subnestedItem", ['$compile', function($compile){
        return {
            restrict: "A",
            require: "^nestedItem",
            link: function (scope, element, iAttr, controller) {
                console.log(scope.item.items);
                if (scope.item.items) {
                    scope.sections = scope.item.items;
                    var html = $compile(controller.nestedItem)(scope)
                    element.append("<h2>HTML BREAK</h2>");
                    element.append(html);

                }
            }
        }
    }]);      */