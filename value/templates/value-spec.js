'use strict';

describe('<%= name %>', function() {

    beforeEach(module('<%= module %>'));

    it('should...', inject(function(<%= name %>) {

        <% if (tst === 'assert') { %>
        assert(<%= name %> === 42);
        <% } else { %>
        expect(<%= name %>).toEqual(42);
        <% } %>
    }));
});
