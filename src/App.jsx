import { useState } from 'react'
import './App.css'
import { Home } from './Home'
import Login from './Login'
import SignUp from './SignUp'

function App() {
  const[menu, setMenu] = useState("sign_in")
  return (
    <>
      <div className='container'>
        {menu === "sign_in" && <Login setMenu={setMenu} />}
        {menu === "sign_up" && <SignUp setMenu={setMenu} />}
        {menu === "login_success" && <Home/>}
       
      </div>
     
    </>
  )
}

export default App


