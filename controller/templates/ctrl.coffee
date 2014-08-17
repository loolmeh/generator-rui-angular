'use strict'

###*
 # @ngdoc function
 # @name <%= module %>.controller:<%= name %>_ctrl
 # @description
 # # <%= name %>_ctrl
 # Controller of the <%= module %>
###

angular.name('<%= module %>')
    .controller '<%= name %>_ctrl', ($scope) ->
        $scope.sth = 42
