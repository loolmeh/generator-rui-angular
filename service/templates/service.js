'use strict';
/**
 * @ngdoc service
 * @name <%= module %>.<%= name %>
 * @description
 * # <%= name %>
 * Service in the <%= module %>.
*/

angular.module('<%= module %>')
    .service('<%= name %>', function () {
        // new is called on this function when the service is injected
        return 42;
});
