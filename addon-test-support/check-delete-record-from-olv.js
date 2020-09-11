import Ember from 'ember';
import moment from 'moment';
import generateUniqueId from 'ember-flexberry-data/utils/generate-unique-id';

Ember.Test.registerAsyncHelper('checkDeleteRecordFromOlv',
  function(app, olvSelector, context, assert, store, model, prop) {
    const helpers = app.testHelpers;
    const olv = helpers.findWithAssert(olvSelector, context);

    let currentData = moment().format('DD.MM.YYYY HH:mm');
    let deleteUseRowButton = generateUniqueId();
    let deleteUseRowMeny = generateUniqueId();
    let deleteUseToolbar1 = generateUniqueId();
    let deleteUseToolbar2 = generateUniqueId();

    Ember.RSVP.all([
      createRecord(store, model, prop, deleteUseRowButton, currentData),
      createRecord(store, model, prop, deleteUseRowMeny, currentData),
      createRecord(store, model, prop, deleteUseToolbar1, currentData),
      createRecord(store, model, prop, deleteUseToolbar2, currentData)
    ]).then(() => {

      assert.expect(assert.expect() + 6);

      // Delete use row button.
      visit(`${currentPath()}?filter=${currentData} ${deleteUseRowButton}`);
      andThen(() => {
        const helperColumn = helpers.find('tbody .object-list-view-helper-column', olv).toArray();
        const deletaRowButton = helpers.find('.object-list-view-row-delete-button', helperColumn);
        assert.equal(1, helperColumn.length);

        click(deletaRowButton);
        click('.menu .refresh-button');
        andThen(() => {
          const helperColumn = helpers.find('tbody .object-list-view-helper-column', olv).toArray();
          assert.equal(0, helperColumn.length);

          // Delete use row meny.
          visit(`${currentPath()}?filter=${currentData} ${deleteUseRowMeny}`);
          andThen(() => {
            const menuColumn = helpers.find('tbody .object-list-view-menu', olv).toArray();
            const deletaRowButton = helpers.find('.item.delete-menu', menuColumn);
            assert.equal(1, menuColumn.length);

            click(deletaRowButton);
            click('.menu .refresh-button');
            andThen(() => {
              const helperColumn = helpers.find('tbody .object-list-view-helper-column', olv).toArray();
              assert.equal(0, helperColumn.length);

              // Delete use toolBar.
              visit(`${currentPath()}?filter=${currentData}`);
              andThen(() => {
                const helperColumn = helpers.find('tbody .object-list-view-helper-column', olv).toArray();
                const checkboxRowButton = helpers.find('.flexberry-checkbox', helperColumn).toArray();
                assert.equal(2, helperColumn.length);

                checkboxRowButton.forEach((checkbox) => { click(checkbox); });
                andThen(() => {
                  const deleteToolbarButton = helpers.find('.menu .delete-button', olv);
                  click(deleteToolbarButton);
                  click('.menu .refresh-button');
                  andThen(() => {
                    const helperColumn = helpers.find('tbody .object-list-view-helper-column', olv).toArray();
                    assert.equal(0, helperColumn.length);
                  });
                });
              });
            });
          });
        });
      });
    });
  }
);

// Create record.
let createRecord = function(store, model, prop, id, data) {
  let record = store.createRecord(model, {
    id: id
  });

  record.set(`${prop}`, `${data} ${id}`);

  return record.save();
};
