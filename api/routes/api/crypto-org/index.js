const sdk = require("@crypto-com/chain-jslib");
const express = require('express');
const router = express.Router();
const HDKey = sdk.HDKey;
const Secp256k1KeyPair = sdk.Secp256k1KeyPair;

// Initializing the library configurations with TestNet config
const cro = sdk.CroSDK({ network: sdk.CroNetwork.Mainnet });

router.get('', (req, res) => {
  // Generating a random mnemonic words
  const randomHDKey = HDKey.generateMnemonic(24); // This returns a 24 words mnemonic phrase

  // Display the mnemonics words to the terminal. Only do this in a trusted, safe and offline computer.
  // You may consider to store it securely instead of logging it.
  console.log(randomHDKey);

  // // Derive a private key from an HDKey at the specified path
  // const privateKey = randomHDKey.derivePrivKey("m/44'/1'/0'/0/0");

  // // Getting a keyPair from a private key
  // const keyPair = Secp256k1KeyPair.fromPrivKey(privateKey);

  // Import an HDKey from a previous mnemonic phrase
  const importedHDKey = HDKey.fromMnemonic(randomHDKey);
  
  // Derive a private key from an HDKey at the specified path
  const privateKey = importedHDKey.derivePrivKey("m/44'/1'/0'/0/0");
  
  // Getting a keyPair from a private key
  const keyPair = Secp256k1KeyPair.fromPrivKey(privateKey);
  
  // Generate address from the key pair
  const address = new cro.Address(keyPair).account();
  console.log(address);
  res.json({
    address: address,
    mnemonic: randomHDKey
  });
});

module.exports = router;