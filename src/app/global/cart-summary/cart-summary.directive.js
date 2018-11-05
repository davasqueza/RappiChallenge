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
        items: "="
      },
      link: function (scope) {

      }
    };
  }
})();
