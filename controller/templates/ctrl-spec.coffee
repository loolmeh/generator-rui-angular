
describe '<%= name %>_ctrl', ->
    beforeEach(module('<%= module %>'))

    ctrl = {}
    scope = {}
    beforeEach inject ($rootScope, $controller) ->
        scope = $rootScope.$new()
        ctrl = $controller('<%= name %>_ctrl', {$scope: scope})

    it 'should', inject ->
        <% if (tst === 'assert') { %>
        assert(scope.sth === 42)
        <% } else { %>
        expect(scope.sth).toEqual(42)
        <% } %>
