'use strict';

const setup = require('./setup_address_counter_table.js');

const C = require('../core');

exports.GetBTCAddress = (event, context, callback) => {
  const customId = event.custom_id;

  C.uniqueAddress(customId, 'btc')
  .then((result) => {
    callback(null, result);
  })
  .catch((error) => {
    callback(error, null);
  });
};

exports.GetLTCAddress = (event, context, callback) => {
  const customId = event.custom_id;

  C.uniqueAddress(customId, 'ltc')
  .then((result) => {
    callback(null, result);
  })
  .catch((error) => {
    callback(error, null);
  });
};

/// !!!! RUN ONLY ONCE !!!! THIS WILL RESET ATOMI COUNTER !!!!
exports.setup = (event, context, callback) => {
  setup.setup()
};
