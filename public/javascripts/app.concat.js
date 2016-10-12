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
        this.remove = function(){
            var subs = [];
            for(var i = 0; i < $scope.vendor.yml_catalog.shop.categories.category.length; i++){
                if($scope.vendor.yml_catalog.shop.categories.category[i]._id == $scope.vendorId){
                    $scope.vendor.yml_catalog.shop.categories.category.splice(i, 1);
                    i--;
                }                                
            }
            for(i = 0; i < $scope.vendor.yml_catalog.shop.categories.category.length; i++){
                
                if($scope.vendor.yml_catalog.shop.categories.category[i]._parentId == $scope.vendorId){
                    subs.push($scope.vendor.yml_catalog.shop.categories.category[i]._id);
                    $scope.vendor.yml_catalog.shop.categories.category.splice(i, 1);
                    i--;
                    
                }                
            }
            subs.push($scope.vendorId);
            alert(subs);
            for(i = 0; i < $scope.vendor.yml_catalog.shop.offers.offer.length; i++){
                for(var j = 0; j < subs.length; j++){
                    if($scope.vendor.yml_catalog.shop.offers.offer[i].categoryId == subs[j]){
                        $scope.vendor.yml_catalog.shop.offers.offer.splice(i, 1);
                        i--;
                    }
                }
            }
        };
        this.toXml = function(){
            var x2js = new X2JS();
            var xml = x2js.json2xml_str( $scope.vendor );
            $scope.xmlout = xml;
            //jsonObj = x2js.json2xml_str(jsonObj);
            
        };
        
    });
    
})();;angular.module('templates', []);

