(function() {
  'use strict';

  angular
    .module('App')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  function CategoryController(MainService, $routeParams, toastr, $log, $mdDialog) {
    var vm = this;

    vm.openFilterDialog = openFilterDialog;
    vm.comparator = comparator;
    vm.filters = {};

    vm.sortBy = [
      {label: "Menor precio", sortExpression: "+price"},
      {label: "Mayor precio", sortExpression: "-price"},
      {label: "Menor cantidad", sortExpression: "+quantity"},
      {label: "Mayor cantidad", sortExpression: "-quantity"},
      {label: "Disponibles primero", sortExpression: "-available"},
      {label: "Agotados primero", sortExpression: "+available"}
    ];

    function loadProducts() {
      var currentCategory = Number($routeParams.categoryPath.split("/").pop());

      MainService.getProductsByCategoryID(currentCategory)
        .then(function (products) {
          vm.products = products;
        })
        .catch(function (error) {
          toastr.error('Hubo un error al intentar cargar los productos de la categoría', 'Error');
          $log.warn("Error while trying to load menu items", error.message);
        });
    }

    function openFilterDialog($event) {
      $mdDialog.show({
        controller: "FilterController",
        controllerAs: "vm",
        templateUrl: "app/category/filters/filter.html",
        targetEvent: $event,
        locals: {
          filters: angular.copy(vm.filters),
          maxPrice: _.max(vm.products, "price").price,
          maxQuantity: _.max(vm.products, "quantity").quantity
        }
      }).then(function (filters) {
        if(filters){
          vm.filters = filters;
        }
      });
    }

    function comparator(actual, expected) {
      var isValid;

      if(_.isObject(expected)){
        var isValidMin = actual > expected.min;
        var isValidMax = expected.max ? actual < expected.max : true;

        isValid = isValidMax && isValidMin;
      }
      else{
       isValid = actual === expected;
      }

      return isValid;
    }

    loadProducts();
  }
})();
