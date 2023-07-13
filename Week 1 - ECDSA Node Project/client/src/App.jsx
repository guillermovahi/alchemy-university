import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import Status from "./Status";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <>
	<div className="alchemyHeader">
		<img src="./alchemy-logo.svg" className="alchemyLogo" alt="Alchemy Logo" />
		<h1>alchemy</h1>
		<h1 className="alchemyBlue">[ university ]</h1>
	</div>
	<div className="header">
		<h1>Week 1 - ECDSA Node</h1>
	</div>
	<div className="app">
      <Wallet
        balance={balance}
		privateKey={privateKey}
		setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey}/>

	  <Status/>
    </div>
	</>
  );
}

export default App;
