'use strict';

/**
 * @ngdoc directive
 * @name <%= module %>.directive:<%= name %>
 * @description
 * # <%= name %>
*/

angular.module('<%= module %>')
    .directive('<%= name %>', function () {

        return {
        <% if (no_tpl) { %>
            template: '<%= _escape(ml_tpl) %>',
        <% } else { %>
            templateUrl: '<%= tpl_path %>',
        <% } %>
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.text('this is the <%= name %> directive');
            }
        };
});
