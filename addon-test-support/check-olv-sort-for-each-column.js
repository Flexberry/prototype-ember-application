import Ember from 'ember';
import { getHeaderSort } from './utils/check-olv-sort-function';

Ember.Test.registerAsyncHelper('checkOlvSortForEachColumn',
  function(app, olvSelector, context, assert) {
    const helpers = app.testHelpers;
    const olv = helpers.findWithAssert(olvSelector, context);
    const headCells = helpers.find('thead .dt-head-left', olv).toArray();

    if (headCells.length > 0) {
      assert.expect(assert.expect() + headCells.length * 4);

      checkColumns(headCells, 0, olv, helpers, assert);
    } else {
      throw new Error(`Helper checkOlvSortForEachColumn can't check empty list`);
    }
  }
);

let checkColumns = function(headCells, index, olv, helpers, assert) {
  let headCell = headCells[index];

  click('.ui.clear-sorting-button');
  click(headCell);
  andThen(() => {
    let sortValue = getHeaderSort(olv, index, helpers);
    assert.equal('▲', sortValue.icon, 'Sorting icon is not correct');
    assert.equal(1, sortValue.index, 'Sorting index is not correct');

    click(headCell);
    andThen(() => {
      let sortValue = getHeaderSort(olv, index, helpers);
      assert.equal('▼', sortValue.icon, 'Sorting icon is not correct');
      assert.equal(1, sortValue.index, 'Sorting index is not correct');

      if (index !== headCells.length - 1) {
        checkColumns(headCells, index + 1, olv, helpers, assert);
      }
    });
  });
};
