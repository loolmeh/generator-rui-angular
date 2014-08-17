describe 'angularjs homepage', ->
    it 'should have a title', ->
        <% if (tst === 'assert') { %>assert = require('assert-promise').equal<% } %>
        browser.get('/')
        <% if (tst === 'assert') { %>assert(browser.getTitle(), 'test')<% } else { %>expect.toBe(browser.getTitle(), 'test')<% } %>
