exports.config = {
    rootElement: 'div',
    specs: ['app/**/*-spec-e2e.js'],
    baseUrl: 'http://localhost:9000',
    seleniumAddress: 'http://localhost:4444/wd/hub', //default test port with Yeoman
    <% if (_in_brows('chrome') && _in_brows('firefox')) { %>
    multiCapabilities: [{
        'browserName': 'firefox'
        }, {
        'browserName': 'chrome'
        }]
    <% } else if (_in_brows('firefox')) { %>
    capabilities: {
        'browserName': 'firefox'
    }
    <% } %>
}
