describe('angularjs homepage', function() {
    it('should have a title', function() {
        <% if (tst === 'assert') { %>var assert = require('assert-promise').equal;<% } %>
        browser.get('/');
        <% if (tst === 'assert') { %>assert(browser.getTitle(), 'test');<% } else { %>expect.toBe(browser.getTitle(), 'test');<% } %>
    });
});
