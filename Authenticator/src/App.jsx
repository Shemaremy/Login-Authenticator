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
    <form action="" className='Sign-up-form'>
      <div className='one'>
        <p className='indicator'>Username</p>
        <div className='input_container'>
          <input type="text" placeholder='Enter a preferred username' name='Name'/>
        </div>
      </div>
      <div className='two'>
        <p className='indicator'>Email</p>
        <div className='input_container'>
          <input type="text" placeholder='Enter your email address' name='Email'/>
        </div>
      </div>
      <div className='two-a'>
        <p className='indicator'>Password</p>
        <div className='input_container'>
          <input type="text" placeholder='Enter password' name='Password'/>
        </div>
      </div>
      <div className='two-b'>
        <p className='indicator'>Confirm Password</p>
        <div className='input_container'>
          <input type="text" placeholder='Confirm password' name='ConfPassword'/>
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
            ( <> 
                <p>Forgot &nbsp; <a href="">Email / Password </a>?</p>
                <p>Don't have an account? &nbsp;<a href="#" onClick={handleFormChange}>Sign up</a></p>              
              </>
            ) : 
            (<p>Already have an account? &nbsp; <a href="#" onClick={handleFormChange}>Sign in</a></p>)
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
