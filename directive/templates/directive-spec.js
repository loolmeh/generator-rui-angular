'use strict';

describe('Directive: <%= name %>', function () {

    // load the directive's module
    beforeEach(module('<%= module %>'));
    
    var element, scope;
    beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<<%= name %>></<%= name %>>');
        element = $compile(element)(scope);
        <% if (tst === 'assert') { %>
        assert(element.text() === '\n<div>\nthe <%= name %> directive \n</div>\n');
        <% } else { %>
        expect(element.text()).toBe('\n<div>\nthe <%= name %> directive \n</div>\n');
        <% } %>
    }));
});
