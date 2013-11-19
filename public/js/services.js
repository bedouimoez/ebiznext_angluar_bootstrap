var services = angular.module('services', []);
services.factory('Employe', ['$http', function($http) {
        var urlBase = 'http://localhost:3000/api/employe';
        var Employe = {};

        Employe.getList = function() {
            return $http.get(urlBase + 's');
        };

        Employe.getEmploye = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        Employe.insertEmploye = function(emp) {
            return $http.post(urlBase, emp);
        };

        Employe.updateEmploye = function(emp) {
            return $http.put(urlBase + '/edit/' + emp.id, emp);
        };

        Employe.deleteEmploye = function(id) {
            return $http.delete(urlBase + '/delete/' + id);
        };
        return Employe;
    }]);

services.factory('Project', ['$http', function($http) {
        var urlBase = 'http://localhost:3000/api/projet';
        var Project = {};

        Project.getProjects = function() {
            return $http.get(urlBase + 's');
        };

        Project.getProject = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        Project.insertProject = function(proj) {
            return $http.post(urlBase, proj);
        };

        Project.updateProject = function(proj) {
            return $http.put(urlBase + '/' + proj.ID, proj);
        };

        Project.deleteProject = function(id) {
            return $http.delete(urlBase + '/' + id);
        };
        return Project;
    }]);

services.factory('LoginService', ['$http', '$cookies', function($http, $cookies) {
        var urlBase = 'http://localhost:3000/api/auth';
        var LoginService = {};
        LoginService.connect = function(user) {
            return $http.post(urlBase,user);
        };
        
        LoginService.isLoggedIn = function() {
            var authenticated = $cookies.user ? true : false;
            return authenticated;
        };

        LoginService.Deconnect = function(login) {
            return $http.delete(urlBase + '/logout',{login:login});
        };
        LoginService.getLoggedInfo = function() {
            return $cookies.user;
        };
        return LoginService;
    }]);