angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngRoute'
])

.config( ['$routeProvider', function($routeProvider) {
  $routeProvider.
     when('/', {
       templateUrl: 'app/index.html',
       controller: 'AppCtrl'
    })
    .when('/app', {
       templateUrl: 'app/index.html',
       controller: 'AppCtrl'
   })
   .when('/viewer', {
      templateUrl: 'viewer/viewer.tpl.html',
      controller: 'ViewerCtrl'
  })
    .otherwise({
     redirectTo: '/app'
   });
 }])




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

.controller('AppCtrl',  ['$scope','dataFactory', function AppController($scope,dataFactory) {
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

    });

  }
});

}]);
