(function() {
  'use strict';

  angular
    .module('App')
    .controller('FilterController', FilterController);

  /** @ngInject */
  function FilterController($mdDialog, filters, maxPrice, maxQuantity, showSearchByName) {
    var vm = this;

    vm.closeFiltersDialog = closeFiltersDialog;
    vm.clearFilters = clearFilters;
    vm.showSearchByName = showSearchByName;
    vm.search = search;
    vm.filters = filters;

    function generatePriceRange() {
      var bottomRange = 0;
      var topRange = roundNumber(maxPrice);

      vm.priceFilter = generateRange(bottomRange, topRange);
    }

    function generateQuantityRange() {
      var bottomRange = 0;
      var topRange = roundNumber(maxQuantity);

      vm.quantityFilter = generateRange(bottomRange, topRange);
    }

    function generateRange(bottomRange, topRange) {
      var range = _.range(bottomRange, topRange, topRange/4);
      return _.map(range, function (number, numberIndex) {
        var numberRange = {};
        numberRange.min = Math.round(number);

        if(numberIndex + 1 < range.length){
          numberRange.max = Math.round(range[numberIndex + 1]);
        }

        return numberRange;
      });
    }

    function roundNumber(number) {
      var digits = number.toString().length - 1;
      var factor = Math.pow(10, digits);

      return Math.ceil(maxPrice/factor)*factor;
    }

    function closeFiltersDialog(){
      $mdDialog.hide();
    }

    function clearFilters(){
      vm.filters = {};
    }

    function search(){
      $mdDialog.hide(vm.filters);
    }

    generatePriceRange();
    generateQuantityRange();
  }
})();
