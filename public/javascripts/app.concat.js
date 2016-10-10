(function() {
    var app = angular.module('parser', ['templates', 'ngAnimate', 'ngFileUpload']);
    
    app.controller('mainCtrl', function($scope, $http){
        $scope.lang = 'ru';
        this.getVendor = function(){
            $http.get('/docs/vendor.xml')
                    .success(function(response){
                        
                        var x2js = new X2JS();
                        var jsonObj = x2js.xml_str2json( response );
                        //jsonObj = x2js.json2xml_str(jsonObj);
                        $scope.vendor = jsonObj;
                        
                    })
                    .error(function(err){alert(err);});
        };
        this.getHome = function(){
            $http.get('/docs/home.xml')
                    .success(function(response){
                        var x2js = new X2JS();
                        var jsonObj = x2js.xml_str2json( response );
                        //jsonObj = x2js.json2xml_str(jsonObj);
                        $scope.home = jsonObj;
                        
                    });
        };
        this.getHome();
        this.getVendor();
        
        this.setVendor = function(id){
            $scope.vendorId = id;
        };
        this.setHome = function(id){
            $scope.homeId = id;
        };
        this.replace = function(){
            for(var i = 0; i < $scope.vendor.yml_catalog.shop.categories.category.length; i++){
                if($scope.vendor.yml_catalog.shop.categories.category[i]._id == $scope.vendorId){
                    $scope.vendor.yml_catalog.shop.categories.category[i]._id = $scope.homeId;
                    
                }
                if($scope.vendor.yml_catalog.shop.categories.category[i]._parentId == $scope.vendorId){
                    $scope.vendor.yml_catalog.shop.categories.category[i]._parentId = $scope.homeId;
                    
                }
            }
            for(var i = 0; i < $scope.vendor.yml_catalog.shop.offers.offer.length; i++){
                if($scope.vendor.yml_catalog.shop.offers.offer[i].categoryId == $scope.vendorId){
                    $scope.vendor.yml_catalog.shop.offers.offer[i].categoryId = $scope.homeId;
                    
                }
            }
        };
        
    });
    
})();;angular.module('templates', []);

