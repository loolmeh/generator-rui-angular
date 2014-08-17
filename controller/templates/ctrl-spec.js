'use strict';

describe('<%= name %>_ctrl', function() {
    beforeEach(module('<%= module %>'));

    var scope, ctrl;
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('<%= name %>_ctrl', {$scope: scope});
    }));	

    it('should ...', inject(function() {
        <% if (tst === 'assert') { %>
        assert(scope.sth === 42);
        <% } else { %>
        expect(scope.sth).toEqual(42);
        <% } %>
    }));
});
