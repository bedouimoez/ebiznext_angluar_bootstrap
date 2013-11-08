var controllers = angular.module('controllers',[]);
controllers.controller('employesController', ['$scope','LoginService', '$location', 'Employe', function($scope,LoginService, $location, Employe) {
        $scope.items = [];
        $scope.isLoggedIn = LoginService.isLoggedIn();
        function getItems() {
            Employe.getList().success(function(list) {
                $scope.items = list;
            }).error(function(error) {
                $scope.status = 'connection with server is not established ';
            });
        }
        ;
        $scope.editEmploye = function(id) {
            $location.path('/ebiznext/edit/' + id);
        };
        $scope.deleteEmploye = function(id) {
            Employe.deleteEmploye(id);
            getItems();
        };
        getItems();
    }]);

controllers.controller('addController', ['$scope', '$location', 'Employe', function($scope, $location, Employe) {
        $scope.submitFrom = function(form, user) {
            if (form.$valid) {
                var employe = {nom: user.nom, prenom: user.prenom, fonction: user.poste, date: user.date, client: user.client};
                Employe.insertEmploye(employe).success(function() {
                    $location.path('/ebiznext/employes');
                }).error(function() {

                });
            }
        };
    }]);

controllers.controller('editController', ['$scope', '$routeParams', '$location', 'Employe', function($scope, $routeParams, $location, Employe) {
        $scope.currentUser = {};
        var id = $routeParams.id;
        (function getCurrentUser() {
            Employe.getEmploye(id).success(function(emp) {
                $scope.currentUser = emp;
            }).error(function(data) {
            });
        })();

        $scope.submitFrom = function(form, user) {
            if (form.$valid) {
                Employe.updateEmploye(user).success(function() {
                    $location.path('/ebiznext/employes');
                }).error(function() {

                });
            }
        };
    }]);
controllers.controller('navbarController', ['$scope', '$location','LoginService', function($scope, $location,LoginService) {
        $scope.isLoggedIn = LoginService.isLoggedIn();
        $scope.currentUser = LoginService.getLoggedInfo();
        $scope.deconnect = function() {
            LoginService.Deconnect();
            $scope.isLoggedIn = LoginService.isLoggedIn();
            window.location.href = '/ebiznext/';
        };
    }
]);
controllers.controller('projectController', ['$scope', 'Project',
    function($scope, Project) {

    }]);
controllers.controller('welcomeController', ['$scope','LoginService', function($scope,LoginService) {
   $scope.isLoggedIn = LoginService.isLoggedIn();
        
    }
]);

controllers.controller('autreController', ['$scope', function($scope) {
    }
]);
controllers.controller('projectListController', ['$scope', '$location','Project', function($scope, $location,Project) {
        $scope.items = [];
        getItems();
        function getItems() {
            Project.getProjects().success(function(data){
                $scope.items = data;
            }).error(
                
                );
        }

    }
]);

controllers.controller('loginController', ['$scope','$location','LoginService', function($scope,$location,LoginService) {
        $scope.isLoggedIn = LoginService.isLoggedIn();
        $scope.error = false;
        $scope.connect = function(form, user) {
            if (form.$valid) {
                LoginService.setLoggedInfo('');
                LoginService.login(user).success(function(data) {
                if (data.exist === true) {
                    LoginService.setLoggedInfo(data.user.login);
                    $scope.isLoggedIn = LoginService.isLoggedIn();
                    window.location.reload(true);
                }else {
                    $scope.error = true;
                }
            }).error(function(error) {
            });
            }
        };
    }]);