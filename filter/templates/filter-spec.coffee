'use strict'

describe '<%= name %>', ->

    beforeEach module '<%= module %>'
    
    it 'should...', inject ($filter) ->
        filter = $filter '<%= name %>'

        <% if (tst === 'assert') { %>
        assert(filter 'input' === 'output')
        <% } else { %>
        expect(filter 'input').toEqual('output')
        <% } %>
