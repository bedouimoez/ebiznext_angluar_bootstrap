var ebiznext = angular.module('ebiznext', ['directives', 'services', 'controllers', 'ngCookies']);
ebiznext.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        var urlBase = '/ebiznext/';
        $routeProvider.when(urlBase + 'autre', {
            templateUrl: 'views/autre.html',
            controller: 'autreController'
        }).when(urlBase + 'list', {
            templateUrl: 'list.html',
            controller: 'projectListController'
        }).when(urlBase + 'project', {
            templateUrl: 'views/projets.html',
            controller: 'projectController'
        }).when(urlBase + 'add', {
            templateUrl: 'views/add.html',
            controller: 'addController'
        }).when(urlBase + 'employes', {
            templateUrl: 'views/employes.html',
            controller: 'employesController'
        }).when(urlBase + 'edit/:id', {
            templateUrl: 'edit.html',
            controller: 'editController'
        }).when(urlBase, {
            templateUrl: 'views/welcome.html',
            controller: 'welcomeController'
        }).otherwise({ redirectTo: urlBase });
        var interceptor = ['$location', '$q', function($location, $q) {
                function success(response) {
                    return response;
                }
                function error(response) {
                    if (response.status === 401) {
                        $location.path('/ebiznext/');
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
                    $location.path('/ebiznext/'); 
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
                $element.show();
        },
        disable: function() {
            this.disable_count++;

            if (this.enable_count === this.disable_count) {
                if ($element.length) {
                    $element.hide();
                }
            }
        }
    };
});