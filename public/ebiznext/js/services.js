var services = angular.module('services',[]);
services.factory('Employe', ['$http', function($http) {
        var urlBase = 'http://localhost:8080/api/employe';
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
        var urlBase = 'http://localhost:8080/api/projet';
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
services.factory('LoginService', ['$http', function($http) {
        var urlBase = 'http://localhost:8080/api/auth';
        var LoginService = {};
        var loggedUser = "";
        LoginService.getUser = function() {
            return $http.get(urlBase + '/' + id);
        };
        LoginService.isRegistred = function(user) {
            return $http.get(urlBase, {params: {login: user.login, pwd: user.pwd}});
        };

        LoginService.isLoggedIn = function(user) {
            return $http.get(urlBase, {params: {login: user.login, pwd: user.pwd}});
        };

        LoginService.Deconnect = function(user) {
            return $http.delete(user);
        };
        LoginService.getLoggedInfo = function() {
                    return loggedUser;
                };
                
        LoginService.setLoggedInfo = function(login) {
                    loggedUser = login;
                };
        return LoginService;
    }]);