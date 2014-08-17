'use strict'

###*
 # @ngdoc service
 # @name <%= module %>.<%= name %>
 # @description
 # # <%= name %>
 # Factory in the <%= module %>.
###

angular.module('<%= module %>')
    .factory '<%= name %>', ->

        # Service logic
        sth = 42

        # Public API here
        {
        do_sth: ->
        sth
        }
