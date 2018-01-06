'use strict';

const bitcoin = require('bitcoinjs-lib')

const keys = {
  btc: process.env.BTC_XPUB,
  ltc: process.env.LTC_XPUB
};

function deriveAddressForIndex(index, currency) {
  return new Promise((resolve, reject) => {
    const xpub = keys[currency];
    let network;
    console.log(xpub);
    if (currency === 'ltc') {
      network = bitcoin.networks.litecoin;
    } else if (currency === 'btc') {
      network = bitcoin.networks.mainnet;
    } else {
      reject();
    };

    const node = bitcoin.HDNode.fromBase58(xpub, network).neutered();

    resolve({
      index: index,
      address: node.derive(0).derive(index).getAddress()
    });
  });
};

module.exports = {
  deriveAddressForIndex: deriveAddressForIndex
};
