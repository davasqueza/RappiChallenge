(function() {
  'use strict';

  angular
    .module('App')
    .directive('cartSummary', cartSummary);

  function cartSummary() {
    return {
      restrict: 'EA',
      templateUrl: "app/global/cart-summary/cart-summary.html",
      scope: {
        toggle: "&",
        items: "=",
        updateAmount: "&",
        removeToCart: "&"
      },
      link: function (scope) {
        scope.addQuantity = addQuantity;
        scope.removeQuantity = removeQuantity;
        scope.removeProduct = removeProduct;

        function addQuantity($event, item) {
          $event.preventDefault();
          $event.stopPropagation();
          var quantity = item.quantity + 1;
          if(quantity <= item.product.quantity){
            scope.updateAmount({product: item.product, quantity: quantity});
          }
        }

        function removeQuantity($event, item) {
          $event.preventDefault();
          $event.stopPropagation();
          var quantity = item.quantity - 1;
          if(quantity > 0){
            scope.updateAmount({product: item.product, quantity: quantity});
          }
        }

        function removeProduct($event, productID) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.removeToCart({productID: productID});
        }

      }
    };
  }
})();
