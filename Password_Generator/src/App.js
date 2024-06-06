import React, { useState } from 'react'
import "./App.css"
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully", false)
    }


  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(COPY_Fail, true)
    }
    else {
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="w-100">
          <div className='container'>
            <h1 className="display-1 p-3 text-center" style={{ marginTop: '-40px', color: 'orange' }}>
              Password Generator
            </h1>
          </div>
          <div className="generator__password " style={{marginTop:'0px',marginBottom:'30px'}}>
            <h3 className="text-warning " style={{ fontSize: '25px' }}>{password}</h3>
            <button className="btn btn-outline-secondary copy__btn">
              <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength" className='ml-3' style={{ fontSize: '30px' }}>Password length</label>
            <input className="pw p-1" style={{ height: '30px', width: '50px' }} defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type="number" id="password-stregth" name="password-strength" max="26" min="8" />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters" className='ml-3' style={{ fontSize: '30px' }}>Add Uppercase Letters</label>
            <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} type="checkbox" id="uppercase-letters" name="uppercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters" className='ml-3' style={{ fontSize: '30px' }}>Add Lowercase Letters</label>
            <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} type="checkbox" id="lowercase-letters" name="lowercase-letters" />
          </div>
          <div className="form-group ">
            <label htmlFor="include-numbers" className='ml-3' style={{ fontSize: '30px' }}>Include Numbers</label>
            <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id="include-numbers" name="include-numbers" />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols" className='ml-3' style={{ fontSize: '30px' }}>Include Symbols</label>
            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="include-symbols" name="include-symbols" />
          </div>
          <button onClick={handleGeneratePassword} className="generator__btn btn-primary" style={{ border: 'none', marginTop:'30px' }}>
            <span className="text-warning " style={{ fontSize: '25px' }}>Generate</span>
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App
