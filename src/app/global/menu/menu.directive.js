(function() {
  'use strict';

  angular
    .module('App')
    .directive('mainMenu', menu);

  function menu($location, $route) {
    return {
      restrict: 'EA',
      templateUrl: "app/global/menu/menu.html",
      scope: {
        toggle: "&",
        items: "="
      },
      link: function (scope) {
        var path = [];
        scope.menuItems = scope.items;

        scope.selectMenu = selectMenu;
        scope.goBack = goBack;
        scope.redirectToCategory = redirectToCategory;

        function selectMenu(menu) {
          if(menu.sublevels){
            path.push(menu.id);
            scope.menuItems = menu.sublevels;
            scope.currentMenu = menu;

          }
          else {
            redirectToCategory(menu);
          }
        }

        function goBack() {
          path.pop();

          scope.currentMenu = undefined;
          scope.menuItems = scope.items;

          _.each(path, function (menuID) {
            scope.currentMenu = _.find(scope.menuItems, function (menu) {
              return menu.id === menuID;
            });
            scope.menuItems = scope.currentMenu.sublevels
          });
        }

        function redirectToCategory(menu) {
          scope.currentMenu = undefined;
          scope.menuItems = scope.items;
          scope.toggle();

          if(menu){
            path.push(menu.id);
          }

          $location.url(path.join("/"));
          $route.reload();

          path = [];
        }
      }
    };
  }
})();
