(function() {
  'use strict';

  angular
    .module('App')
    .service('MainService', MainService);

  function MainService($resource, $log) {
    var service = {
      getAllCategories: getAllCategories,
      getProductsByCategoryID: getProductsByCategoryID,
      getCartSummary: getCartSummary,
      addToCart: addToCart,
      removeToCart: removeToCart
    };

    var resource = {
      categories: $resource("./assets/data/categories.json"),
      products: $resource("./assets/data/products.json")
    };

    var cartSummary;

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

    function getCartSummary() {
      if(cartSummary){
        return cartSummary;
      }

      if(!localStorage.cartSummary){
        cartSummary = [];
      }
      else{
        loadCartSummary();
      }

      return cartSummary;
    }

    function loadCartSummary() {
      try {
        cartSummary = JSON.parse(localStorage.cartSummary);
      }
      catch (err){
        localStorage.removeItem("cartSummary");
        $log.warn("Error loading previous cart summary: ", err);

        cartSummary = [];
      }
    }

    function addToCart(productID, amount) {
      var product = _.find(cartSummary, function (product) {
        return product.id = productID;
      });

      if(product){
        product.amount = amount;
      }
      else{
        cartSummary.push({id: productID, amount: amount});
      }

      saveCartSummary();
    }

    function removeToCart(productID) {
      var productIndex = _.findIndex(cartSummary, function (product) {
        return product.id = productID;
      });

      if(productIndex !== -1){
        cartSummary.splice(productIndex, 1);
      }
    }

    function saveCartSummary() {
      localStorage.cartSummary = JSON.stringify(cartSummary);
    }
  }
})();
