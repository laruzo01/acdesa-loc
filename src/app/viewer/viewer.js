angular.module( 'ngBoilerplate.viewer', [
  'ui.router'
 ])
 /**
  * Each section or module of the site can also have its own routes. AngularJS
  * will handle ensuring they are all available at run-time, but splitting it
  * this way makes each module more "self-contained".
 */
 .config(function config( $stateProvider ) {
   $stateProvider.state( 'viewer', {
     url: '/viewer',
     views: {
       "main": {
         controller: 'ViewerCtrl',
         templateUrl: 'viewer/viewer.tpl.html'
       }
     },
     data:{ pageTitle: 'viewer' }
   });
 })

.factory('dataFactory', function($http,$q){

  })

.controller( 'ViewerCtrl',  ['$scope','dataFactory',  function ViewerController($scope,dataFactory) {


}]);  //controller
