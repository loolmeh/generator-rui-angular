'use strict'

###*
# @ngdoc overview
# @name <%= name %>
# @description
# <%= name %>
#
# Root of the <%= name %> module.
###

angular.module('<%= name %>',
    [\<% if (basic_config.basic_deps.length > 0) { %>
<%= basic_config.basic_deps_str %><% } %>
    '<%= basic_config.router %>',
    # Add more dependencies above
    ]
)
<% if (basic_config.router === 'ui.router') { %>.config ($stateProvider) ->
    $stateProvider
    # Add new routes above
<% } else { %>.config ($routeProvider) ->
    $routeProvider
    # Add new routes above
<% } %>
