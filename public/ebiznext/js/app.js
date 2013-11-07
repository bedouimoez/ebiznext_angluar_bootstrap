var moduleProj = angular.module('ebiznext', ['directives','services','controllers', 'ngCookies']);
moduleProj.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        var urlBase = '/ebiznext/';
        $routeProvider.when(urlBase + 'autre', {
            templateUrl: 'views/autre.html',
            controller: 'autreController'
        }).when(urlBase + 'list/', {
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
            templateUrl:'views/welcome.html',
            controller: 'welcomeController'
        });
        $locationProvider.html5Mode(true);
    }]);

moduleProj.config(['$httpProvider', function($httpProvider) {
    var interceptor = ['$q', 'LoadingIndicatorHandler', function($q, LoadingIndicatorHandler) {
        return function(promise) {
            LoadingIndicatorHandler.enable();    
            return promise.then(
                function( response ) {
                    LoadingIndicatorHandler.disable();
                    return response;
                },
                function( response ) {
                    LoadingIndicatorHandler.disable();
                    return $q.reject( response );
                }
            );
        };
    }];
    
    $httpProvider.responseInterceptors.push(interceptor);
}]);

moduleProj.factory('LoadingIndicatorHandler', function(){
var $element = $('#loading-indicator');
    return {
        enable_count: 0,
        disable_count: 0,
        enable: function() {
            this.enable_count++;
            
            if ( $element.length ) $element.show();
        },
        disable: function() {
            this.disable_count++;
            
            if ( this.enable_count === this.disable_count ) {
                if ($element.length){ $element.hide();}
            }
        }
    };
});