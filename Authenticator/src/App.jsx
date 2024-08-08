import {React, useState} from 'react'
import './App.css'

function App() {

  const [isLogin, setIsLogin] = useState(true);


  const handleFormChange = () => {
    setIsLogin(!isLogin);
  };


  const LoginForm = (
    <form action="" className='login_form'>
      <div className='one'>
        <p className='indicator'>Email</p>
        <div className='input_container'>
          <input type="text" />
        </div>
      </div>
      <div className='two'>
        <p className='indicator'>Password</p>
        <div className='input_container'>
          <input type="text" />
        </div>
      </div>
      <div className='three'>
        <button>Sign in</button>
      </div>
    </form>
  );

  const SignUpForm = (
    <form action="" className='login_form'>
      <div className='one'>
        <p className='indicator'>Name</p>
        <div className='input_container'>
          <input type="text" />
        </div>
      </div>
      <div className='two'>
        <p className='indicator'>Passkey</p>
        <div className='input_container'>
          <input type="text" />
        </div>
      </div>
      <div className='three'>
        <button>Sign up</button>
      </div>
    </form>
  );




  return (
    <div className="App">
      <div className='Form-container'>
        <div className='upper_part'>
          <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
        </div>
        {isLogin ? LoginForm : SignUpForm}
        <div className='lower_part'>
          <p>
            {isLogin ? 
             (<>Don't have an account? &nbsp; <a href="#" onClick={handleFormChange}>Sign up</a><p>Forgot &nbsp; <a href="">Email / Password </a>?</p></>) : 
             (<>Already have an account? &nbsp; <a href="#" onClick={handleFormChange}>Sign in</a></>)
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
