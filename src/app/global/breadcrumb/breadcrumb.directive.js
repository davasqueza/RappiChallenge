(function() {
  'use strict';

  angular
    .module('App')
    .directive('breadcrumb', breadcrumb);

  function breadcrumb(MainService, $routeParams, toastr, $log) {
    return {
      restrict: 'EA',
      templateUrl: "app/global/breadcrumb/breadcrumb.html",
      scope: {},
      link: function (scope) {

        function generateBreadcrumb(categories) {
          var categoryPath = $routeParams.categoryPath.split("/").map(Number);
          var currentCategory = categories;
          var currentPath = [];

          scope.breadcrumb = _.map(categoryPath, function (categoryID) {
            var category = _.find(currentCategory, function (category) {
              return category.id === categoryID;
            });

            currentPath.push(category.id);
            currentCategory = category.sublevels;

            return {
              name: category.name,
              path: currentPath.join("/")
            }
          });
        }

        function loadCategoriesList() {
          MainService.getAllCategories()
            .then(function (result) {
              generateBreadcrumb(result.categories);
            })
            .catch(function (error) {
              toastr.error('Hubo un error al intentar cargar el menú, inténtalo nuevamente más tarde', 'Error');
              $log.warn("Error while trying to load menu items", error.message);
            });
        }

        loadCategoriesList();
      }
    };
  }
})();
