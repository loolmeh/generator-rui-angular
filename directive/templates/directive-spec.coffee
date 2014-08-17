'use strict'

describe 'Directive: <%= cameledName %>', ->

    # load the directive's module
    beforeEach module '<%= scriptAppName %>'

    scope = {}

    beforeEach inject ($controller, $rootScope) ->
        scope = $rootScope.$new()

    it 'should make hidden element visible', inject ($compile) ->
        element = angular.element '<<%= name %>></<%= name %>>'
        element = $compile(element) scope
        <% if (tst === 'assert') { %>
        assert(element.text() === '\n<div>\nthe <%= name %> directive \n</div>\n')
        <% } else { %>
        expect(element.text()).toBe('\n<div>\nthe <%= name %> directive \n</div>\n')
        <% } %>
