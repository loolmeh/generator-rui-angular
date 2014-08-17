'use strict'

describe '<%= name %>', ->
    beforeEach ->
        module '<%= module %>'
        <%= module %>.config (<%= name %>Provider) ->
            <%= name %>Provider.set_sth(42)

    it 'should...', inject (<%= name %>) ->
        <% if (tst === 'assert') { %>
        assert(<%= name %> === 42)
        <% } else { %>
        expect(<%= name %>).toEqual(42)
        <% } %>
