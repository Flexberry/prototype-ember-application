/* eslint-disable ember/no-test-import-export */
/* global visit, andThen, currentPath, click */
/* eslint-disable ember/no-test-and-then */
import Ember from 'ember';
import { executeTest } from './execute-flexberry-lookup-test';

executeTest('flexberry-lookup hierarchy olv test', (store, assert) => {
  assert.expect(16);
  const path = 'components-examples/flexberry-lookup/hierarchy-olv-in-lookup-example';
  visit(path);

  const elementCheck = function (name) {
    const $elem = Ember.$(name);
    return $elem.length !== 0;
  };

  andThen(() => {
    assert.equal(currentPath(), path);

    const $lookupChooseButtons = Ember.$('.ui-change');

    //First lookup
    click($lookupChooseButtons[0]);

    andThen(() => {
      assert.equal(elementCheck('button.hierarchical-button'), true, 'has hierarchical-button');
      assert.equal(elementCheck('button.hierarchy-expand'), true, 'has hierarchy-expand');
      assert.equal(elementCheck('div.nav-bar'), false, 'no nav-bar');

      const $menuTable = Ember.$('.content table.object-list-view');
      const $menuTableBody = $menuTable.children('tbody');
      const $menuTableRowCount = $menuTableBody.children('tr').length;

      const $expandButton = Ember.$('button.hierarchy-expand').eq(0);
      click($expandButton);

      andThen(() => {
        assert.equal($menuTableRowCount < $menuTableBody.children('tr').length, true, 'hierarchy expanded');

        const $nextTableRow = $expandButton.parents('tr').next('tr');
        const $nextTableRowTd = $nextTableRow.children('td').next();

        assert.equal($nextTableRowTd.css('padding-left'), '20px', 'expanded text has padding-left: 20px');

        click($lookupChooseButtons[1]);
      });
    });

    //Second lookup
    andThen(() => {
      assert.equal(elementCheck('button.hierarchical-button'), true, 'has hierarchical-button');
      assert.equal(elementCheck('button.hierarchy-expand'), false, 'no hierarchy-expand');
      assert.equal(elementCheck('div.nav-bar'), true, 'has nav-bar');

      let $hierarchicalButton = Ember.$('button.hierarchical-button');
      click($hierarchicalButton);

      andThen(() => {
        assert.equal(elementCheck('button.hierarchy-expand'), true, 'has hierarchy-expand');
        assert.equal(elementCheck('div.nav-bar'), false, 'no nav-bar');

        const $menuTable = Ember.$('.content table.object-list-view');
        const $menuTableBody = $menuTable.children('tbody');
        const $menuTableRowCount = $menuTableBody.children('tr').length;

        const $expandButton = Ember.$('button.hierarchy-expand');
        click($expandButton[0]);

        andThen(() => {
          assert.equal($menuTableRowCount < $menuTableBody.children('tr').length, true, 'hierarchy expanded');

          const $nextTableRow = $expandButton.parents('tr').next('tr');
          const $nextTableRowTd = $nextTableRow.children('td').next();

          assert.equal($nextTableRowTd.css('padding-left'), '20px', 'expanded text has padding-left: 20px');

          click($lookupChooseButtons[2]);
        });
      });
    });

    //Third lookup
    andThen(() => {
      assert.equal(elementCheck('button.hierarchical-button'), false, 'no hierarchical-button');
      assert.equal(elementCheck('button.hierarchy-expand'), false, 'no hierarchy-expand');
      assert.equal(elementCheck('div.nav-bar'), true, 'has nav-bar');
    });
  });
});
