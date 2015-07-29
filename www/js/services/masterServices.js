angular.module("GoodPhood.Services", [])
.factory("appService", function($http, $q){
    var baseUrl  = "http://dev.goodphood.in/api/";
    
    var baseServiceCall = function(url, type, data){
        var deferred = $q.defer();
        $http({
                url : baseUrl+url,
               method : type,
               data : data
              }).then(function(resp){
                     deferred.resolve(resp.data);
                }, function(err){
                    alert("error");
                    deferred.reject(err); 
                });
        return deferred.promise; 
    } 
    
    return {
        gpService : baseServiceCall 
    }

})