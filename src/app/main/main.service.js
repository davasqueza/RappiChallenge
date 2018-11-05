(function() {
  'use strict';

  angular
    .module('App')
    .service('MainService', MainService);

  function MainService($resource, $log) {
    var service = {
      getAllCategories: getAllCategories,
      getCategoryByPath: getCategoryByPath,
      getProductsByCategoryID: getProductsByCategoryID,
      getProductByID: getProductByID,
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

    function getCategoryByPath(path) {
      var categoriesList = path.split("/");
      return resource.categories.get().$promise.then(function (response) {
        var sublevels = response.categories;
        var category;
        while (categoriesList.length && sublevels){
          var categoryID = Number(categoriesList.shift());
          category = _.find(sublevels, function (category) {
            return category.id === categoryID;
          });

          if(!category){
            return {};
          }

          sublevels = category.sublevels;
        }

        return category;
      });
    }

    function getProductsByCategoryID(categoryID) {
      return resource.products.get().$promise.then(function (response) {
        return _.filter(response.products, function (product) {
          return product.sublevel_id === categoryID;
        })
      });
    }

    function getProductByID(productID) {
      return resource.products.get().$promise.then(function (response) {
        return _.find(response.products, function (product) {
          return product.id === productID;
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
        resource.products.get().$promise.then(function (response) {
          cartSummary = _.map(cartSummary, function (item) {
            item.product = _.find(response.products, function (product) {
              return product.id === item.product.id;
            });

            return item;
          });
        });
      }
      catch (err){
        localStorage.removeItem("cartSummary");
        $log.warn("Error loading previous cart summary: ", err);

        cartSummary = [];
      }
    }

    function addToCart(product, quantity) {
      var productOnCart = _.find(cartSummary, function (item) {
        return item.product.id === product.id;
      });

      if(productOnCart){
        productOnCart.quantity = quantity;
      }
      else{
        cartSummary.push({product: product, quantity: quantity});
      }

      saveCartSummary();
    }

    function removeToCart(productID) {
      var productIndex = _.findIndex(cartSummary, function (item) {
        return item.product.id = productID;
      });

      if(productIndex !== -1){
        cartSummary.splice(productIndex, 1);
      }

      saveCartSummary();
    }

    function saveCartSummary() {
      var parsedCartSummary = _.map(cartSummary, function (item) {
        return {
          product: _.pick(item.product, "id"),
          quantity: item.quantity
        }
      });
      localStorage.cartSummary = JSON.stringify(parsedCartSummary);
    }
  }
})();
