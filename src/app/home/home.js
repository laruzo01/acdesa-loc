
 angular.module( 'ngBoilerplate.home', [
   'ngRoute' //   'ui.router'
 ])

 /**
  * Each section or module of the site can also have its own routes. AngularJS
  * will handle ensuring they are all available at run-time, but splitting it
  * this way makes each module more "self-contained".
 **/


.config( ['$routeProvider', function($routeProvider) {
  $routeProvider.
     when('/', {
        templateUrl: 'home.tpl.html',
        controller: 'HomeCtrl'
    })
    .when('/home', {
       templateUrl: 'home/home.tpl.html',
       controller: 'HomeCtrl'
   })
   .when('/viewer', {
      templateUrl: 'viewer/viewer.tpl.html',
      controller: 'ViewerCtrl'
  })
    .otherwise({
     redirectTo: '/home'
   });
 }])

    // .config(['$routeProvider',
    //   function($routeProvider) {
    //     $routeProvider.
    //        when('/home', {
    //           templateUrl: 'home/home.tpl.html',
    //           controller: 'HomeCtrl'
    //       })
    //
    //       .otherwise({
    //        redirectTo: '/home'
    //      });
    //
    //
    //
    //     }]);



  //   $stateProvider
  //   .state( 'home', {
  //     url: '/home',
  //     views: {
  //       "main": {
  //                   controller: 'HomeCtrl',
  //                   templateUrl: 'home/home.tpl.html'
  //               },
  //       "viewer": {
  //                   controller: 'ViewerCtrl',
  //                   templateUrl: 'viewer/viewer.tpl.html'
  //                  }
  //    }
  //  });

  //   $stateProvider
  //   .state( 'home', {
  //     url: '/home',
  //     views: {
  //       "main": {
  //         controller: 'HomeCtrl',
  //         templateUrl: 'home/home.tpl.html'
  //       }
  //    }
  //  })
  //  .state( 'viewer', {
  //      url: '/viewer',
  //      views: {
  //        "viewer": {
  //          controller: 'ViewerCtrl',
  //          templateUrl: 'viewer/viewer.tpl.html'
  //        }
  //     }
  //   });


.factory('dataFactory', function($http,$q){
     getClientes = function (url) {
                  var deferred = $q.defer();
                  $http.get(url).then(function (response) {
                        var data = [];
                        angular.forEach(response.data, function(e, i){
                          if (i < 20){
                            data.push({id: e.IdCliente, name: e.Nombre, label: e.IdCliente+' - '+e.Nombre, location: e.Poblacion});
                           }
                         });
                          deferred.resolve(data);
                      });
                  return deferred.promise;
          };

     getClienteDetails = function (url) {
                      var deferred = $q.defer();

                      $http.get(url).then(function (data) {
                          deferred.resolve( data );

                          });
                      return deferred.promise;
              };



            return {
              'getClientes': getClientes,
              'getClienteDetails':getClienteDetails
             };



  })

.controller( 'HomeCtrl',  ['$scope','dataFactory','$state', function HomeController($scope,dataFactory,$state) {


  var urlBase = 'http://webapiaccdesalocal.azurewebsites.net/api/';

      $scope.empresas = [
        { name: 'Desa', IdEmpresa: 1 },
        { name: 'Moto', IdEmpresa: 2 }
    ];

$scope.loadingCustomers = true;
$scope.getCustomers = function(sFiltro,idEmpresa) {

 var  url = urlBase + 'Clientes?sFiltro='+  sFiltro +  '&IdEmpresa=' +idEmpresa;

 return  dataFactory.getClientes(url).then(function(response) {
    return response;
  });
 };

$scope.$watch('customerSelected', function(customer){
var details = [];
  if (angular.isObject(customer)){
    var  url = 'http://webapiaccdesalocal.azurewebsites.net/api/Representantes?IdCliente=1218&IdEmpresa=1';
          dataFactory.getClienteDetails(url).then(function(response) {
          details = response.data[0];
          console.log(details);
           $state.go("viewer");
    });

  }
});

}]);  //controller
