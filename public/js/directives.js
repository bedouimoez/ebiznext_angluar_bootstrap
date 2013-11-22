var directives = angular.module('directives', []);
directives.directive('ngConfirmClick', [
    function() {
        return {
            priority: 1,
            terminal: true,
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }]);
directives.directive('paginator', function() {
    return {
        priority: 0,
        restrict: 'A',
        scope: {items: '&'},
        templateUrl: '/partials/paginator.html',
        replace: false,
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                    scope.pageSizeList = [5, 10, 20, 50, 100];
                    scope.paginator = {
                        pageSize: 5,
                        currentPage: 0
                    };

                    scope.isFirstPage = function() {
                        return scope.paginator.currentPage == 0;
                    };
                    scope.isLastPage = function() {
                        if (typeof scope.items() === 'undefined') {
                            return false;
                        }
                        return scope.paginator.currentPage
                                >= scope.items().length / scope.paginator.pageSize - 1;
                    };
                    scope.incPage = function() {
                        if (!scope.isLastPage()) {
                            scope.paginator.currentPage++;
                        }
                    };
                    scope.decPage = function() {
                        if (!scope.isFirstPage()) {
                            scope.paginator.currentPage--;
                        }
                    };
                    scope.firstPage = function() {
                        scope.paginator.currentPage = 0;
                    };
                    scope.numberOfPages = function() {
                        if (typeof scope.items() === 'undefined') {
                            return 0;
                        }
                        return Math.ceil(scope.items().length / scope.paginator.pageSize);
                    };
                    scope.$watch('paginator.pageSize', function(newValue, oldValue) {
                        if (newValue != oldValue) {
                            scope.firstPage();
                        }
                    });

                    // ---- Functions available in parent scope -----

                    scope.$parent.firstPage = function() {
                        scope.firstPage();
                    };
                    // Function that returns the reduced items list, to use in ng-repeat
                    scope.$parent.pageItems = function() {
                        if (typeof scope.items() === 'undefined') {
                            return {};
                        }
                        var start = scope.paginator.currentPage * scope.paginator.pageSize;
                        var limit = scope.paginator.pageSize;
                        return scope.items().slice(start, start + limit);
                    };
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                }
            };
        }
    };
});