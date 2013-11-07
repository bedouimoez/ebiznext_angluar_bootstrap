var projectService = angular.module('projectService', ['ngResource']);
projectService.factory('Project', ['$resource', function($resource) {
        var url = 'http://localhost:8080/api/posts/:id';
        return $resource(url,{method:'PUT'} ,{ id: '@id' });
    }]);