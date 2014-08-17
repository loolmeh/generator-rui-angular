'use strict';

/**
 * @ngdoc function
 * @name <%= module %>.decorator:<%= name %>
 * @description
 * # <%= name %>
 * Decorator of the <%= module %>
 */

angular.module('<%= module %>')
    .config(function ($provide) {
        $provide.decorator('<%= name %>', function ($delegate) {
            // decorate the $delegate
            return $delegate;
        });
    });

