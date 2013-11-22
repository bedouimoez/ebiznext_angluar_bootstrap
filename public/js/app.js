var ebiznext = angular.module('ebiznext', ['directives', 'services', 'controllers', 'ngCookies']);
ebiznext.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/contact', {
            templateUrl: '/partials/contact.html',
            controller: 'contactController'
        }).when('/project/list', {
            templateUrl: '/partials/list.html',
            controller: 'projectListController'
        }).when('/project', {
            templateUrl: '/partials/projets.html',
            controller: 'projectController'
        }).when('/add', {
            templateUrl: '/partials/add.html',
            controller: 'addController'
        }).when('/employes', {
            templateUrl: '/partials/employes.html',
            controller: 'employesController'
        }).when('/edit/:id', {
            templateUrl: '/partials/edit.html',
            controller: 'editController'
        }).when('/', {
            templateUrl: '/partials/welcome.html',
            controller: 'welcomeController'
        }).otherwise({redirectTo: '/'});
        var interceptor = ['$location', '$q', function($location, $q) {
                function success(response) {
                    $('#error-indicator').hide();
                    return response;
                }
                function error(response) {
                    if (response.status === 0) {
                        $('#error-indicator').show();
                        $q.reject(response);
                    } else if (response.status === 401) {
                        $location.path('/');
                        $('#error-indicator').hide();
                        return $q.reject(response);
                    } else {
                        $('#error-indicator').hide();
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

ebiznext.run(['$rootScope', '$location', 'LoginService', function($rootScope, $location, LoginService) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            var loggedInUser = LoginService.isLoggedIn();
            if (!loggedInUser && $location.path() != '/') {
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
            if ($element.length) {
                $.blockUI({message: $element});
            }
        },
        disable: function() {
            this.disable_count++;

            if (this.enable_count === this.disable_count) {
                if ($element.length) {
                    $.unblockUI({message: $element});
                }
            }
        }
    };
});