'use strict';

describe('<%= name %>', function() {
    beforeEach(module('<%= module %>'));

    it('should ...', inject(function($filter) {

        var filter = $filter('<%= name %>');
        <% if (tst === 'assert') { %>
        assert(filter('input') === 'output');
        <% } else { %>
        expect(filter('input')).toEqual('output');
        <% } %>
    }));
});
