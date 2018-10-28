(function() {
  'use strict';

  angular
    .module('App')
    .directive('mainMenu', menu);

  function menu() {
    return {
      restrict: 'EA',
      templateUrl: "app/global/menu/menu.html",
      scope: {
        toggle: "&",
        items: "="
      },
      link: function () {}
    };
  }
})();
