const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")


app.use(cors());
app.use(express.json());

const balances = {
  "041d03b7231119dd606d492f4e28f6fcac102191be1296afdbddd49b4de7a66f5708483dfb9c5a8a36323e3b54705ee556afeec1ab9f59604e3f083fc3a592ae24": 100, //65e963aa621823eb34e6ed223d8e8a0fe608de60e1636035e7d8057d0dba7a6a
  "04bdc67bce08d956348ced198805a94bab11099044beb56bcb71f92aa7e8995261ab25976c521beb793e86341e7ebc89fc32119290ef9de6be4c36f14532fd30df": 50, //8a29dc16cab2022a8ee7921626a313931d6ccff971f92da19263f3ee570a0d24
  "049447ef2680f2a266f6ccd50e909f87100ece67c785714c46b393110381afea376a8a68682a30278742500cea497cfa96dc94346f81b01b78f730a6b6d2faafb4": 75, //15be96998d9706bb7636bfbe7fe0558dcfa564b70975e42bf59b05d11ede8c9d
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
	//TODO: get a signature from the client-side application
	//TODO: recover the public address  from the signature  -> that is goint to be your sender
	const { sender, recipient, amount, signature, recovery } = req.body;

  try{

		const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
		const hash = keccak256(bytes);

		const sig = new Uint8Array(signature);

		const publicKey = await secp.recoverPublicKey(hash, sig, recovery);

		if(toHex(publicKey) !== sender){
			res.status(400).send({ message: "Invalid Signature" });
		}

	  setInitialBalance(sender);
	  setInitialBalance(recipient);

	  if (balances[sender] < amount) {
		  res.status(400).send({ message: "Not enough funds!" });
	  } else {
		  balances[sender] -= amount;
		  balances[recipient] += amount;
		  res.send({ balance: balances[sender] });
	  }
	} catch (error) {
		console.log(error.message);
	}
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
