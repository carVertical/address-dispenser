'use strict';

const D = require('./db.js');
const N = require('./node.js');

function uniqueAddress(customId, currency) {
  let addr;

  return D.getUniqueIndex(currency)
  .then((index) => {
    return N.deriveAddressForIndex(index, currency);
  })
  .then(({ index, address }) => {
    addr = address;
    return D.storeAddress(currency, index, customId, address);
  })
  .then(() => {
    return addr;
  });
};

module.exports = {
  uniqueAddress: uniqueAddress,
};
