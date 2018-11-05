(function() {
  'use strict';

  angular
    .module('App')
    .controller('ProductController', ProductController);

  function ProductController(MainService, $routeParams, toastr, $scope) {
    var vm = this;

    vm.addToCart = addToCart;

    function loadProduct() {
      var productID = $routeParams.productID;

      MainService.getProductByID(productID)
        .then(function (product) {
          vm.product = product;
        })
        .catch(function () {
          toastr("Error", "Hubo un error al cargar la información del producto");
        });
    }

    function addToCart() {
      MainService.addToCart(vm.product, 1);
      $scope.$parent.MainCtrl.toggleSummaryCart();
    }

    loadProduct();
  }
})();
