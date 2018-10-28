(function() {
  'use strict';

  angular
    .module('App')
    .controller('MainController', MainController);

  function MainController(MainService, $mdSidenav, $log, toastr) {
    var vm = this;

    vm.toggleMenu = toggleMenu;

    function toggleMenu() {
      $mdSidenav('left').toggle();
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
