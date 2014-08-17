'use strict'

describe '<%= name %>', ->

    beforeEach module '<%= module %>'
    
    it 'should...', inject (<%= name %>) ->

        <% if (tst === 'assert') { %>
        assert(<%= name %>() === 42)
        <% } else { %>
        expect(<%= name %>()).toEqual(42)
        <% } %>
