import logo from './logo.svg';
import './App.css';
import { Web3 } from 'web3';
import { useState } from 'react';

//constants
const ADDRESS = "0x2b5b6c3d0200e5dee4aF4Be6558c02A87139D99A";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [counter,setCounter] = useState('none');
  const web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //reading functions
async function getNumber() {
  const result = await myContract.methods.getNumber().call()
  setCounter(result.toString());
}

//writing functions
async function increaseNumber() {
  const accountConnected = await web3.eth.requestAccounts();
  //increasing function
  const Transaction = await myContract.methods.increaseNumber().send({ from: accountConnected[0] });
  console.log(Transaction);
  getNumber();
}

async function decreaseNumber() {
  const accountConnected = await web3.eth.requestAccounts();
  //decreasing function
  const Transaction = await myContract.methods.decreaseNumber().send({ from: accountConnected[0] });
  console.log(Transaction);
  getNumber();
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get Current Counter</button><br />
        <button onClick={increaseNumber}>Increase Counter</button><br />
        <button onClick={decreaseNumber}>Decrease Counter</button><br />
        <p>Counter: {counter}</p>
      </header>
    </div>
  );
}

export default App;
