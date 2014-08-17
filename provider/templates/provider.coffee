'use strict'

###*
 # @ngdoc service
 # @name <%= module %>.<%= name %>
 # @description
 # # <%= name %>
 # Provider in the <%= module %>.
###

angular.module('<%= module %>')
    .provider '<%= name %>', ->

        # Private variables
        sth = 42

        # Private constructor
        class Thing
            @do_sth = ->
                sth

        # Public API for configuration
        @set_sth = (s) ->
            sth = s

        # Method for instantiating
        @$get = ->
            new Thing()

        return
