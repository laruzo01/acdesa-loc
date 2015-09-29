// describe( 'AppCtrl', function() {
//   describe( 'isCurrentUrl', function() {
//     var AppCtrl, $location, $scope;
//
//     beforeEach( module( 'ngBoilerplate' ) );
//
//     beforeEach( inject( function( $controller, _$location_, $rootScope ) {
//       $location = _$location_;
//       $scope = $rootScope.$new();
//       AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
//     }));
//
//     it( 'should pass a dummy test', inject( function() {
//       expect( AppCtrl ).toBeTruthy();
//     }));
//   });
// });


describe( 'home section', function() {
  beforeEach( module( 'ngBoilerplate' ) );

  it( 'should have a dummy test', inject( function() {
    expect( true ).toBeTruthy();
  }));
});
