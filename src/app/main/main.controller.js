(function() {
  'use strict';

  angular
    .module('App')
    .controller('MainController', MainController);

  function MainController(MainService, $mdSidenav, $log, toastr) {
    var vm = this;

    vm.toggleMenu = toggleMenu;
    vm.toggleSummaryCart = toggleSummaryCart;
    vm.productsOnCart = MainService.getCartSummary;
    vm.updateAmount = MainService.addToCart;
    vm.removeToCart = MainService.removeToCart;

    function toggleMenu() {
      $mdSidenav('menu').toggle();
    }

    function toggleSummaryCart() {
      $mdSidenav('summaryCart').toggle();
    }

    function loadMenuItems() {
      MainService.getAllCategories()
        .then(function (result) {
          vm.menuItems = result.categories;
        })
        .catch(function (error) {
          toastr.error('Hubo un error al intentar cargar el menú, inténtalo nuevamente más tarde', 'Error');
          $log.warn("Error while trying to load menu items", error.message);
        });
    }

    loadMenuItems();
  }
})();
