var ebiznext = angular.module('ebiznext', ['directives', 'services', 'controllers', 'ngCookies']);
ebiznext.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/autre', {
            templateUrl: 'partials/autre.html',
            controller: 'autreController'
        }).when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'projectListController'
        }).when('/project', {
            templateUrl: 'partials/projets.html',
            controller: 'projectController'
        }).when('/add', {
            templateUrl: 'partials/add.html',
            controller: 'addController'
        }).when('/employes', {
            templateUrl: 'partials/employes.html',
            controller: 'employesController'
        }).when('/edit/:id', {
            templateUrl: 'edit.html',
            controller: 'editController'
        }).when('/', {
            templateUrl: 'partials/welcome.html',
            controller: 'welcomeController'
        }).otherwise({ redirectTo: '/' });
        var interceptor = ['$location', '$q', function($location, $q) {
                function success(response) {
                    return response;
                }
                function error(response) {
                    if (response.status === 401) {
                        $location.path('/');
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
                return function(promise) {
                    return promise.then(success, error);
                };
            }];
        $httpProvider.responseInterceptors.push(interceptor);
        $locationProvider.html5Mode(true);
    }]);

ebiznext.run(['$rootScope', '$location', '$cookieStore', 'LoginService', function($rootScope, $location, $cookieStore, LoginService) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            var loggedInUser =  LoginService.isLoggedIn();
                if(!loggedInUser ){
                    $location.path('/'); 
            }
        });
    }]);

ebiznext.config(['$httpProvider', function($httpProvider) {
        var interceptor = ['$q', 'LoadingIndicatorHandler', function($q, LoadingIndicatorHandler) {
                return function(promise) {
                    LoadingIndicatorHandler.enable();
                    return promise.then(
                            function(response) {
                                LoadingIndicatorHandler.disable();
                                return response;
                            },
                            function(response) {
                                LoadingIndicatorHandler.disable();
                                return $q.reject(response);
                            }
                    );
                };
            }];

        $httpProvider.responseInterceptors.push(interceptor);
    }]);

ebiznext.factory('LoadingIndicatorHandler', function() {
    var $element = $('#loading-indicator');
    return {
        enable_count: 0,
        disable_count: 0,
        enable: function() {
            this.enable_count++;
            if ($element.length)
                //$element.show();
        $.blockUI({ message: $element }); 
        },
        disable: function() {
            this.disable_count++;

            if (this.enable_count === this.disable_count) {
                if ($element.length) {
                    //$element.hide();
                    $.unblockUI({ message: $element });
                }
            }
        }
    };
});