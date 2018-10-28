(function() {
  'use strict';

  angular
    .module('App')
    .service('MainService', MainService);

  function MainService($resource) {
    var service = {
      getAllCategories: getAllCategories
    };

    var resource = {
      categories: $resource("./assets/data/categories.json")
    };

    return service;

    function getAllCategories() {
      return resource.categories.get().$promise;
    }
  }
})();
