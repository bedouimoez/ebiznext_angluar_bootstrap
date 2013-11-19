describe("Controllers Test", function() {
    describe("navbarController", function() {
        var $scope, ctrl;
        beforeEach(module('ebiznext'));
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('navbarController', {
                $scope: $scope
            });
        }));

        it('navbar controller user not conencted', function() {
            expect($scope.isLoggedIn).toBe(false);
            expect($scope.currentUser).toBe(undefined);
        });
    });
	
    //welcomeController
    describe("welcomeController", function() {
        var $scope, ctrl;
        beforeEach(module('ebiznext'));
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('welcomeController', {
                $scope: $scope
            });
        }));
        
        it('welcomeController', function() {
            expect($scope.isLoggedIn).toBe(false);
        });
    });
});