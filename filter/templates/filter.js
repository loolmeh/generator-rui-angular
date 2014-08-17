'use strict';

/**
 * @ngdoc filter
 * @name <%= module %>.filter:<%= name %>
 * @function
 * @description
 * # <%= name %>
 * Filter in the <%= module %> module.
 */

angular.module('<%= module %>')
    .filter('<%= name %>', function () {
        return function (input) {
            return '<%= name %> filter: ' + input;
    };
});
