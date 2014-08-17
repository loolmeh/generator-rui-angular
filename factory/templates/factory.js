'use strict';

/**
 * @ngdoc service
 * @name <%= module %>.<%= name %>
 * @description
 * # <%= name %>
 * Factory in the <%= module %> module.
*/

angular.module('<%= module %>')
    .factory('<%= name %>', function () {

        // Service logic
        var sth = 42;

        // Public API here
        return {
            do_sth: function () {
                return sth;
            }
        };
    });
