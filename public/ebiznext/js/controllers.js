var controllers = angular.module('controllers',[]);
controllers.controller('employesController', ['$scope', '$location', 'Employe', function($scope, $location, Employe) {
        $scope.items = [];
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
controllers.controller('navbarController', ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location) {
        $scope.loggedInUser = $cookieStore.get('loggedUser');
        $scope.deconnect = function() {
            $cookieStore.put('loggedUser', '');
            $location.path('/ebiznext');
            return;
        };
    }
]);
controllers.controller('projectController', ['$scope', 'Project',
    function($scope, Project) {

    }]);
controllers.controller('welcomeController', ['$scope', function($scope) {
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

controllers.controller('loginController', ['$scope', '$location', 'LoginService', '$cookieStore', function($scope, $location, LoginService, $cookieStore) {
        $scope.statut = false;
        $scope.connect = function(form, user) {
            if (form.$valid) {
                LoginService.isRegistred(user).success(function(data) {
                    if (data.exist === true) {
                        $cookieStore.put('loggedUser', data.user.login);
                        $location.path('/ebiznext/welcome');
                    } else {
                        $scope.statut = true;
                    }
                }).error(function(error) {
                    console.log('server is down');
                });
            }
        };
    }]);