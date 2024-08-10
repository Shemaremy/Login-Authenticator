import {React, useState} from 'react'
import './App.css'

function App() {


  

  const [errors, setErrors] = useState({});

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);


  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');

  const [password, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');




  const handleFormChange = () => {
    setIsLogin(!isLogin);
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

    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserName, Email, password })
    })


    .then(response => response.json()
    .then(data => {
      if (response.ok) {
        UsernameBorder.style.borderColor = '';
        EmailBorder.style.borderColor = '';
        alert('Success: User registered successfully');
        console.log('Success:', data);
        //window.location.reload();
      } else {
        alert("Sth wrong")
        const UsernameDup = "Error: MongoServerError: E11000 duplicate key error collection: Test.users index: UserName_1 dup key: { UserName: \"Shemaremy\" }";
        const EmailDup = "Error: MongoServerError: E11000 duplicate key error collection: Test.users index: Email_1 dup key: { Email: \"remyshema20@gmail.com\" }";
        if (UsernameDup === data) {
          UsernameBorder.style.borderColor = 'red';
          alert("Username already exists")
        }
        else if (EmailDup === data) {
          alert("Email already exists");
          EmailBorder.style.borderColor = 'red';
          UsernameBorder.style.borderColor = '';          
        }
        console.error('Error:', data);
      }
    }))


    .catch((error) => {
      console.error('Error:', error);
      alert('Error: Something went wrong. Please try again.');
    });
  
  }

  
  
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    const BorderOne = document.querySelector('.rimwe');
    const BorderTwo = document.querySelector('.kabiri');
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        // navigate('/');
        // window.location.reload();
        setErrors({});
        BorderOne.style.borderColor = '';
        BorderTwo.style.borderColor = '';
        handleCreateUser();
    }



  }














  const LoginForm = (
    <form action="" className='login_form'>
      <div className='one'>
        <p className='indicator'>Email / Username</p>
        <div className='input_container'>
          <input type="text" 
            placeholder='Enter your username or email' 
            name='Email'
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
            maxLength={20}
            required
          />
          <div className='eye-container' type="button" onClick={handleHidePassword}>
            {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
          </div>
        </div>
      </div>
      <div className='three'>
        <button>Sign in</button>
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
        <button type='submit'>Sign up</button>
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
