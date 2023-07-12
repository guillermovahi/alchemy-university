const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

const privateKey = secp.utils.randomPrivateKey()

console.log('Private Key:', toHex(privateKey))

const publickey = secp.getPublicKey(privateKey)

console.log('Public Key:', toHex(publickey))