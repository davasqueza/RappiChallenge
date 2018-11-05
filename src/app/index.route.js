(function() {
  'use strict';

  angular
    .module('App')
    .config(routeConfig);

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:productID*/p', {
        templateUrl: 'app/product/product.html',
        controller: 'ProductController',
        controllerAs: 'vm'
      })
      .when('/:categoryPath*', {
        templateUrl: 'app/category/category.html',
        controller: 'CategoryController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/1'
      });

    $locationProvider.html5Mode(true);
  }

})();
