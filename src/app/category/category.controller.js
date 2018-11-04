(function() {
  'use strict';

  angular
    .module('App')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  function CategoryController(MainService, $routeParams, toastr, $log) {
    var vm = this;

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

    loadProducts();
  }
})();
