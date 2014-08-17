'use strict'

###*
# @ngdoc filter
# @name <%= module %>.filter:<%= name %>
# @function
# @description
# # <%= name %>
# Filter in the <%= module %> module.
###

angular.module('<%= module %>')
    .filter '<%= name %>', ->
        (input) ->
            '<%= name %> filter: ' + input
