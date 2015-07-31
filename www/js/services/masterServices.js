angular.module("GoodPhood.Services", [])
.factory("appService", function($http, $q){
    var baseUrl  = "http://dev.goodphood.in/api/";
    /*
    
    
    RestAPIPath: "http://dev.goodphood.in/api",
    validateMobilePath: "http://dev.goodphood.in/api/validatemobile",
    addguestPath: "http://dev.goodphood.in/api/addguest",
    menuPath: "http://dev.goodphood.in/api/create",
    orderSummeryPath: "http://dev.goodphood.in/api/ordersummary/",
    userCountPath: "http://dev.goodphood.in/api/usercount/",
    addOrUpdateItemsPath: "http://dev.goodphood.in/api/addorupdate",
    vieworderPath: "http://dev.goodphood.in/api/vieworder/",
    confirmorderPath: "http://dev.goodphood.in/api/confirmorder",
    getUsersPath: "http://dev.goodphood.in/api/getusers/",
    authorizeuserPath: "http://dev.goodphood.in/api/authorizeuser",
    invoicePath: "http://dev.goodphood.in/api/getinvoice/",
    getPreferences: "http://dev.goodphood.in/api/getpreferences/",
    savePreferences: "http://dev.goodphood.in/api/savepreferences",
    getFeedback: "http://dev.goodphood.in/api/getfeedback/",
    saveFeedback: "http://dev.goodphood.in/api/savefeedback",
    likeItemPath: "http://dev.goodphood.in/api/addorupdatelike",
    deleteItemPath : "http://dev.goodphood.in/api/delete" 
    
    
    */
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