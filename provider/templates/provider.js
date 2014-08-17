'use strict';

/**
 * @ngdoc service
 * @name <%= module %>.<%= name %>
 * @description
 * # <%= name %>
 * Provider in the <%= module %>.
*/

angular.module('<%= module %>')
    .provider('<%= name %>', function () {

        // Private variables
        var sth = 42;

        // Private constructor
        function Thing() {
            this.do_sth = function () {
                return sth;
                };
        }

        // Public API for configuration, use in a .config for module wide configuration of this service
        this.set_sth = function (s) {
            sth = s;
            };

        // Method for instantiating
        this.$get = function () {
            return new Thing();
        };

    });
