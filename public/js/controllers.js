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
        };
        $scope.editEmploye = function(id) {
            $location.path('/edit/' + id);
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
                    $location.path('/employes');
                }).error(function() {

                });
            }
        };
    }]);

controllers.controller('editController', ['$scope', '$routeParams', '$location', 'Employe', function($scope, $routeParams, $location, Employe) {
        $scope.currentUser = {}; 
        (function() {
            var id = $routeParams.id;
            Employe.getEmploye(id).success(function(emp) {
            $scope.currentUser = emp;
            }).error(function(){});})();
        
        $scope.submitFrom = function(form, user) {
            if (form.$valid) {
                Employe.updateEmploye(user).success(function() {
                    $location.path('/employes');
                }).error(function() {

                });
            }
        };
    }]);
controllers.controller('navbarController', ['$scope', '$window','LoginService', function($scope, $window,LoginService) {
        $scope.isLoggedIn = LoginService.isLoggedIn();
        $scope.currentUser = LoginService.getLoggedInfo();
        $scope.deconnect = function() {
        LoginService.Deconnect(LoginService.getLoggedInfo()).success(function(){
        $window.location.href = '/';
        }).error(function(){});
        };
    }
]);

controllers.controller('welcomeController', ['$scope','LoginService', function($scope,LoginService) {
   $scope.isLoggedIn = LoginService.isLoggedIn();     
    }
]);

controllers.controller('projectListController', ['$scope','Project', function($scope,Project) {
        $scope.items = [];
        (function (){
            Project.getProjects().success(function(data){$scope.items = data;})
                    .error(function(){});
        })();
    }
]);

controllers.controller('loginController', ['$scope','$window','LoginService', function($scope,$window,LoginService) {
        $scope.isLoggedIn = LoginService.isLoggedIn();
        $scope.error = false;
        $scope.connect = function(form, user) {
            if (form.$valid) {
                LoginService.connect(user).success(function(data) {
                if (data.exist === true) {
                    $scope.isLoggedIn = LoginService.isLoggedIn();
                    $window.location.reload(true);
                }else {
                    $scope.error = true;
                }
            }).error(function() {
            });
            }
        };
    }]);
controllers.controller('contactController', ['$scope', function($scope) {}]);
controllers.controller('projectController', ['$scope',function($scope) {}]);