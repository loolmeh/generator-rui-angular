'use strict'

###*
 # @ngdoc service
 # @name <%= module %>.<%= name %>
 # @description
 # # <%= name %>
 # Service in the <%= module %>.
###

angular.module('<%= module %>')
    .service '<%= classedName %>', ->
        # a new instance of this is returned to the injector
        return 42
