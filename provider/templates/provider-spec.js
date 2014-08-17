'use strict';

describe('<%= name %>', function() {

    beforeEach(function() {
        module('<%= module %>')
        <%= module %>.config(function(<%= name %>Provider) {
            <%= name %>Provider.set_sth(42)
            })
        });

    it('should...', inject(function(<%= name %>) {

        <% if (tst === 'assert') { %>
        assert(<%= name %> === 42);
        <% } else { %>
        expect(<%= name %>).toEqual(42);
        <% } %>
    }));
});
