import {React, useState, useEffect} from 'react'
import './App.css'

function App() {


  

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);


  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');

  const [password, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');


  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setFormState(FORM_STATE.RESET_PASSWORD);
    }
  }, []);











  const FORM_STATE = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGOT_PASSWORD: 'forgot_password',
    RESET_PASSWORD: 'reset_password',
  };
  
  const [formState, setFormState] = useState(FORM_STATE.LOGIN);
  
  const handleFormChange = (newState) => {
    setFormState(newState);
  };















  const handleHidePassword = () => {
    setShowPassword(!showPassword)
  }


  const handleHidePasswordOne = () => {
    setShowPasswordOne(!showPasswordOne);
  }

  const handleHidePasswordTwo = () => {
    setShowPasswordTwo(!showPasswordTwo);
  }















  const validateForm = () => {

    const newErrors = {};

    const BorderOne = document.querySelector('.rimwe');
    const BorderTwo = document.querySelector('.kabiri');

    if(password !== passwordTwo) {
      newErrors.passwordTwo = 'Your passwords must match sir!';
      BorderOne.style.borderColor = 'red';
      BorderTwo.style.borderColor = 'red';
    }

    return newErrors;
  };


  const handleCreateUser = () => {
    const UsernameBorder = document.querySelector('.gatatu');
    const EmailBorder = document.querySelector('.kane');

    async function registerUser() {

      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ UserName, Email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          UsernameBorder.style.borderColor = '';
          EmailBorder.style.borderColor = '';
          alert('Success: User registered successfully');
          console.log('Success:', data);
          window.location.reload();
        } else {
          const errorMessage = data.message;
          if (errorMessage.includes("UserName")) {
            alert("Username already exists");
            UsernameBorder.style.borderColor = 'red';
          } else if (errorMessage.includes("Email")) {
            alert("Email already exists");
            UsernameBorder.style.borderColor = '';
            EmailBorder.style.borderColor = 'red';
          }
          console.error(errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong. Please try again.');
      }
    }
    registerUser();
 
  }

  
  
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    const BorderOne = document.querySelector('.rimwe');
    const BorderTwo = document.querySelector('.kabiri');
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } 
    else {
      // navigate('/');
      // window.location.reload();
      setErrors({});
      BorderOne.style.borderColor = '';
      BorderTwo.style.borderColor = '';
      handleCreateUser();  
    }
  }


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    async function loginUser() {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert('Success: Login successful');
          console.log('Success:', data);
          window.location.reload();
        } else {
          alert(`Error: ${data.message}`);
          console.error('Login failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong. Please try again.');
      }
    }
    loginUser();
    

  };
  
  const handleForgotSubmit = (e) => {
    e.preventDefault();

    async function forgotPassword() {
      try {
        const response = await fetch('http://localhost:5000/api/forgot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Email: loginIdentifier }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert('Link sent successfully!!');
          console.log('Success:', data);
          window.location.reload();
        } else {
          alert(`Error: ${data.message}`);
          console.error('Sending failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong. Please try again.');
      }
    }
    forgotPassword();
  };









  const handleFinalReset = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
  
    if (token) {
      setFormState(FORM_STATE.RESET_PASSWORD);
      try {
        const response = await fetch('http://localhost:5000/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, passwordTwo }),
        });
    
        const data = await response.json();
        if (response.ok) {
          alert('Password has been reset successfully');
          window.close();
        } else {
          alert(`Error: ${data.message}`);
          window.close();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong. Please try again.');
      }
    }
    else {
      alert("Check the else in handleFinalReset")
    }  
  }

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    const BorderOne = document.querySelector('.rimwe');
    const BorderTwo = document.querySelector('.kabiri');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 
    else {
      // navigate('/');
      // window.location.reload();
      setErrors({});
      BorderOne.style.borderColor = '';
      BorderTwo.style.borderColor = '';
      handleFinalReset();  
    }
  };
  










  const LoginForm = (
    <form action="" className='login_form' onSubmit={handleLoginSubmit}>
      <div className='one'>
        <p className='indicator'>Email / Username</p>
        <div className='input_container'>
          <input type="text" 
            placeholder='Enter your username or email' 
            name='Email'
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            maxLength={25}
            required
          />
        </div>
      </div>
      <div className='two '>
        <p className='indicator'>Password</p>
        <div className='input_container for-password'>
          <input type={showPassword ? "text" : "password"} 
            placeholder='Enter your password' 
            name='Password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            maxLength={20}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePassword}>
            {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
      </div>
      <div className='three'>
        <button className='account_button' type='submit'>Sign in</button>
      </div>
    </form>
  );



  const SignUpForm = (
    <form className='Sign-up-form' onSubmit={handleSignUpSubmit}>
      <div className='one'>
        <p className='indicator'>Username</p>
        <div className='input_container gatatu'>
          <input type="text" 
            placeholder='Enter a preferred username' 
            name='Name'
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='two'>
        <p className='indicator'>Email</p>
        <div className='input_container kane'>
          <input type="text" 
            placeholder='Enter your email address' 
            name='Email'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='two-a'>
        <p className='indicator'>Password</p>
        <div className='input_container for-password rimwe'>
          <input type={showPasswordOne ? "text" : "password"} 
            placeholder='Enter password' 
            name='FirstPassword'
            maxLength={20}
            value={password}
            onChange={(e) => setPasswordOne(e.target.value)}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePasswordOne}>
            {showPasswordOne ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
      </div>
      <div className='two-b'>
        <p className='indicator'>Confirm Password</p>
        <div className='input_container for-password kabiri'>
          <input type={showPasswordTwo ? "text" : "password"} 
            placeholder='Confirm password' 
            name='ConfPassword'
            maxLength={20}
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePasswordTwo}>
            {showPasswordTwo ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
        {errors.passwordTwo && <p className='error'>{errors.passwordTwo}</p>}
      </div>
      <div className='three'>
        <button className='account_button' type='submit'>Sign up</button>
      </div>
    </form>
  );



  const ForgotPasswordForm = (
    <form action="" className='login_form' onSubmit={handleForgotSubmit}>
      <div className='one'>
        <p className='indicator'>Email</p>
        <div className='input_container'>
          <input type="text" 
            placeholder='Enter your email to receive a verification link' 
            name='Email'
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            maxLength={25}
            required
          />
        </div>
      </div>
      <div className='three'>
        <button className='account_button' type='submit'>Send link</button>
      </div>
    </form>
  );


  const ResetPasswordForm = (
    <form className='Sign-up-form' onSubmit={handlePasswordReset}>
      <div className='two-a'>
        <p className='indicator'>Password</p>
        <div className='input_container for-password rimwe'>
          <input type={showPasswordOne ? "text" : "password"} 
            placeholder='Enter password' 
            name='FirstPassword'
            maxLength={20}
            value={password}
            onChange={(e) => setPasswordOne(e.target.value)}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePasswordOne}>
            {showPasswordOne ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
      </div>
      <div className='two-b'>
        <p className='indicator'>Confirm Password</p>
        <div className='input_container for-password kabiri'>
          <input type={showPasswordTwo ? "text" : "password"} 
            placeholder='Confirm password' 
            name='ConfPassword'
            maxLength={20}
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePasswordTwo}>
            {showPasswordTwo ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
        {errors.passwordTwo && <p className='error'>{errors.passwordTwo}</p>}
      </div>
      <div className='three'>
        <button className='account_button' type='submit'>Reset password</button>
      </div>
    </form>
  );


  return (
    <div className="App">
      <div className='Form-container'>
        <div className='upper_part'>
          <h1 className='upper_part'>
            {formState === FORM_STATE.LOGIN && 'Login'}
            {formState === FORM_STATE.SIGNUP && 'Sign up'}
            {formState === FORM_STATE.FORGOT_PASSWORD && 'Forgot Password'}
            {formState === FORM_STATE.RESET_PASSWORD && 'Password Reset'}
          </h1>
        </div>
        
        <div className='lower_part'>
          {formState === FORM_STATE.LOGIN && LoginForm}
          {formState === FORM_STATE.SIGNUP && SignUpForm}
          {formState === FORM_STATE.FORGOT_PASSWORD && ForgotPasswordForm}
          {formState === FORM_STATE.RESET_PASSWORD && ResetPasswordForm}
          <p>
            {formState === FORM_STATE.LOGIN ? 
            ( <> 
                <p>Forgot &nbsp; <a href="" onClick={() => handleFormChange(FORM_STATE.FORGOT_PASSWORD)}> Password </a>?</p>
                <p>Don't have an account? &nbsp;<a href="#" onClick={() => handleFormChange(FORM_STATE.SIGNUP)}>Sign up</a></p>              
              </>
            ) : formState === FORM_STATE.SIGNUP ?
            (<p>Already have an account? &nbsp; <a href="#" onClick={() => handleFormChange(FORM_STATE.LOGIN)}>Sign in</a></p>)
              : formState === FORM_STATE.RESET_PASSWORD ?
             (<></>)
             : 
             (<p>Remember your password? &nbsp; <a href="#" onClick={() => handleFormChange(FORM_STATE.LOGIN)}>Sign in</a></p>)
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
