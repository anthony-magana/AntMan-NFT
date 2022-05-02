import {useState} from 'react';
import './App.css';
import MainMint from './components/MainMint';
import Navbar from './components/Navbar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div>
      <div className="App">
        <Navbar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className='background'></div>
    </div>
  );
}

export default App;
