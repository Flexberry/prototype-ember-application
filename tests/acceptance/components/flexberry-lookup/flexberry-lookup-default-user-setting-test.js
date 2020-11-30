/* eslint-disable ember/no-test-import-export */
/* eslint-disable no-undef */
/* eslint-disable ember/no-test-and-then */
import Ember from 'ember';
import { executeTest } from './execute-flexberry-lookup-test';

executeTest('flexberry-lookup render olv with default user setting test', (store, assert) => {
  assert.expect(2);

  visit('components-examples/flexberry-lookup/user-settings-example');

  andThen(function () {
    assert.equal(currentURL(), 'components-examples/flexberry-lookup/user-settings-example');

    // eslint-disable-next-line ember/no-jquery
    let $lookupButtouChoose = Ember.$('.ui-change');

    // Click choose button.
    Ember.run(() => {
      $lookupButtouChoose.click();
    });

    Ember.run(() => {
      var done = assert.async();
      setTimeout(function () {

        // eslint-disable-next-line ember/no-jquery
        let $lookupSearch = Ember.$('.content table.object-list-view');
        let $lookupSearchThead = $lookupSearch.children('thead');
        let $lookupSearchTr = $lookupSearchThead.children('tr');
        let $lookupHeaders = $lookupSearchTr.children('th');

        // Check count at table header.
        assert.strictEqual($lookupHeaders.length === 2, true, 'Component render olv with default user setting');


        done();
      }, 1000);
    });
  });
}, (app) => {
  const suggestionTypeDefaultUserSetting =
  `{
    "colsOrder": [
      {
        "propName": "name"
      },
      {
        "propName": "moderated"
      }
    ]
  }`;
  app.register('user-setting:ember-flexberry-dummy-suggestion-type', suggestionTypeDefaultUserSetting, { instantiate: false });

  const service = app.__container__.lookup('service:user-settings');
  service.getCurrentUserSetting = () => Ember.Object.create({});
});
