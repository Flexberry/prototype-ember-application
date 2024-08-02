import { run } from '@ember/runloop';
import {all} from 'rsvp';
import $ from 'jquery';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { executeTest, addDataForDestroy } from './execute-folv-test';
import { loadingList } from './folv-tests-functions';
import {settled, click} from '@ember/test-helpers';
import generateUniqueId from 'ember-flexberry-data/utils/generate-unique-id';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Builder from 'ember-flexberry-data/query/builder';

/* eslint-disable no-unused-vars */
executeTest('check delete using button on toolbar', async (store, assert, app) => {
  assert.expect(5);
  const path = 'components-acceptance-tests/flexberry-objectlistview/folv-paging';

  const modelName = 'ember-flexberry-dummy-suggestion-type';
  const howAddRec = 2;
  const uuid = '0' + generateUniqueId();

  // Add records for deliting.
  let newRecords = A();

  for (let i = 0; i < howAddRec; i++) {
    run(() => {
      newRecords.pushObject(store.createRecord('ember-flexberry-dummy-suggestion-type', { name: uuid }));
    });
  }

  let promises = A();
  newRecords.forEach(function(item) {
    promises.push(item.save());
  });

  addDataForDestroy(newRecords);

  let resolvedPromises;
  run(() => {
    resolvedPromises = RSVP.all(promises);
  });
  await resolvedPromises;
  assert.ok(resolvedPromises, 'All records saved.');

  let builder = new Builder(store).from(modelName).count();
  let result = await store.query(modelName, builder.build());
  await visit(path + '?perPage=' + result.meta.count);
  await settled();
      
  assert.equal(currentPath(), path);
  let olvContainerClass = '.object-list-view-container';
  let trTableClass = 'table.object-list-view tbody tr';

  let $folvContainer = $(olvContainerClass);
  let $rows = () => { return $(trTableClass, $folvContainer).toArray(); };

  // Check that the records have been added.
  let recordIsForDeleting = $rows().reduce((sum, current) => {
    let nameRecord = $.trim(current.children[1].innerText);
    let flag = (nameRecord.indexOf(uuid) >= 0);
    return sum + flag;
  }, 0);

  assert.equal(recordIsForDeleting, howAddRec, howAddRec + ' records added');

  let checkRecords = async function() {
    promises.clear();
    $rows().forEach((row) => {
      let nameRecord = $.trim(row.children[1].innerText);
      let $firstCell = $('.object-list-view-helper-column-cell', row);
      let checkboxInRow = $('.flexberry-checkbox', $firstCell)[0];
      if (nameRecord.indexOf(uuid) >= 0) {
        run(()=> promises.pushObject(click(checkboxInRow)));
      }
    });

      await all(promises);
  };

  await checkRecords();
  let $toolBar = $('.ui.secondary.menu')[0];
  let $deleteButton = $toolBar.children[2];

  // Delete the marked records.
  /* eslint-disable no-unused-vars */
  await loadingList($deleteButton, olvContainerClass, trTableClass);
  await settled();

  let recordsIsDelete = $rows().every((element) => {
    let nameRecord = $.trim(element.children[1].innerText);
    return nameRecord.indexOf(uuid) < 0;
  });

  assert.ok(recordsIsDelete, 'Each entry begins with \'' + uuid + '\' is delete with button in toolbar button');

  // Check that the records have been removed into store.
  let builder2 = new Builder(store).from(modelName).where('name', FilterOperator.Eq, uuid).count();
  let result2 = await store.query(modelName, builder2.build());
  assert.notOk(result2.meta.count, 'records \'' + uuid + '\'not found in store');
});
/* eslint-enable no-unused-vars */