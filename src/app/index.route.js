(function() {
  'use strict';

  angular
    .module('App')
    .config(routeConfig);

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'vm'
      })
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
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }

})();
