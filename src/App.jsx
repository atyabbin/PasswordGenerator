import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isToggled, setIsToggled] = useState(false); // Dark mode state
const [bgColor,setBgcolor]=useState("black")
  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='container' style={{ backgroundColor: isToggled ? 'black' : 'white' , color: isToggled ? 'white' : 'black' }}>

      <h1 className='title' style={{ backgroundColor: isToggled ? 'black' : 'white' , color: isToggled ? 'white' : 'black' }}>Password Generator</h1>
      <div className="password-container">
        <input
          type="text"
          value={password}
          className="password-input"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='copy-button'
        >Copy</button>
      </div>
      <div className='settings'>
        <div className='setting-item'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='length-slider'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="setting-item">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>
        <div className="setting-item">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Include Special Characters</label>
        </div>
        <div className="setting-item">
          <input
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
          />
          <label>Dark Mode</label>
        </div>
      </div>
    </div>
  );
}

export default App;
