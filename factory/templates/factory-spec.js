'use strict';

describe('<%= name %>', function() {

    beforeEach(module('<%= module %>'));

    it('should...', inject(function(<%= name %>) {

        <% if (tst === 'assert') { %>
        assert(<%= name %>.do_sth() === 42);
        <% } else { %>
        expect(<%= name %>.do_sth()).toEqual(42);
        <% } %>
    }));
});
