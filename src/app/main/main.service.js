(function() {
  'use strict';

  angular
    .module('App')
    .service('MainService', MainService);

  function MainService($resource) {
    var service = {
      getAllCategories: getAllCategories,
      getProductsByCategoryID: getProductsByCategoryID
    };

    var resource = {
      categories: $resource("./assets/data/categories.json"),
      products: $resource("./assets/data/products.json")
    };

    return service;

    function getAllCategories() {
      return resource.categories.get().$promise;
    }

    function getProductsByCategoryID(categoryID) {
      return resource.products.get().$promise.then(function (response) {
        return _.filter(response.products, function (product) {
          return product.sublevel_id === categoryID;
        })
      });
    }
  }
})();
