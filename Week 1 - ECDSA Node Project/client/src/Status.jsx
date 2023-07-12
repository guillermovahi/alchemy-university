import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"

const publicKeys = {
	"041d03b7231119dd606d492f4e28f6fcac102191be1296afdbddd49b4de7a66f5708483dfb9c5a8a36323e3b54705ee556afeec1ab9f59604e3f083fc3a592ae24": 100,
	"04bdc67bce08d956348ced198805a94bab11099044beb56bcb71f92aa7e8995261ab25976c521beb793e86341e7ebc89fc32119290ef9de6be4c36f14532fd30df": 50,
	"049447ef2680f2a266f6ccd50e909f87100ece67c785714c46b393110381afea376a8a68682a30278742500cea497cfa96dc94346f81b01b78f730a6b6d2faafb4": 75,
};

const privateKeys = [
	"65e963aa621823eb34e6ed223d8e8a0fe608de60e1636035e7d8057d0dba7a6a",
	"8a29dc16cab2022a8ee7921626a313931d6ccff971f92da19263f3ee570a0d24",
	"15be96998d9706bb7636bfbe7fe0558dcfa564b70975e42bf59b05d11ede8c9d"
]

function Status({ }) {

  return (
    <div className="container2 status">
      <h1>Wallets Status</h1>
		Available Accounts: <hr/>{Object.entries(publicKeys).map(([publicKey, balance], index) => (
			<div key={index}>
				<label>
					Private Key: {privateKeys[index]} <br/>
				</label>
				<label>
					Address (Public Key): {"0x" + publicKey.slice(-40)} <br/>
				</label>
				<label>
					Balance: {balance} <br/>
				</label>
				<hr/>
			</div>
		))}
    </div>

  );
}

export default Status;
