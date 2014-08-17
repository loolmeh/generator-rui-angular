'use strict'

###*
 # @ngdoc function
 # @name <%= module %>.decorator:<%= name %>
 # @description
 # # <%= name %>
 # Decorator of the <%= module %>
###

angular.module("<%= module %>").config ($provide) ->
    $provide.decorator "<%= name %>", ($delegate) ->
        # decorate the $delegate
        $delegate

