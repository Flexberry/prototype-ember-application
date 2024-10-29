import { isNone } from '@ember/utils';

/**
  Client-side sorting for records content.

  @method sortRecords
  @param {Array} records Records for sorting.
  @param {Object} sortDef Sorting definition.
  @param {Int} start First index in records.
  @param {Int} end Last index in records.
  @return {Array} Sorted records.
*/
export default function sortRecords(records, sortDef, start, end) {
  const recordsSort = records;
  if (start >= end) {
    return recordsSort;
  }

  // Form hash array (there can be different observers on recordsSort changing, so it is better to minimize such changes).
  const hashArray = [];
  for (let i = start; i <= end; i++) {
    const currentRecord = recordsSort.objectAt(i);
    const currentHash = currentRecord.get(sortDef.attributePath || sortDef.propName);
    const hashStructure = {
      record: currentRecord,
      hash: currentHash
    };

    hashArray.push(hashStructure);
  }

  const hashArrayLength = hashArray.length;

  // Compare record with number koef1 and koef2.
  // It returns true if records should be exchanged.
  const condition = function(koef1, koef2) {
    const firstProp = hashArray[koef1].hash;
    const secondProp = hashArray[koef2].hash;
    if (sortDef.direction === 'asc') {
      return isNone(secondProp) && !isNone(firstProp) ? true : firstProp > secondProp;
    }

    if (sortDef.direction === 'desc') {
      return !isNone(secondProp) && isNone(firstProp) ? true : firstProp < secondProp;
    }

    return false;
  };

  // Sort with minimum exchanges.
  for(let i = 0; i < hashArrayLength; i++) {
    // Find minimum in right not sorted part.
    let min = i;
    for(let j = i + 1; j < hashArrayLength; j++) {
      if(condition(min, j)) {
        min = j;
      }
    }
    if (min != i) {
      // Exchange current with minimum.
      let tmp = hashArray[i];
      hashArray[i] = hashArray[min];
      hashArray[min] = tmp;
    }
  }

  // Remove unsorted part.
  recordsSort.removeAt(start, end - start + 1);

  // Insert sorted elements.
  for (let i = start; i <= end; i++) {
    recordsSort.insertAt(i, hashArray[i - start].record);
  }

  return recordsSort;
}
