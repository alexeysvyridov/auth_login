import React, {useState, useEffect} from 'react';
import fire from './fire';
import Login from './Login/Login'
import Home from './Home/Home'
import './App.css';
function App() {
  const [user, setUser] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };
  const clearErrors = () => {
      setEmailError('');
      passwordError('');
  };

  const handleLogin = () => {
    clearInputs()
    fire.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
      if(err.code == 'auth/invalid-email' || 
         err.code == 'auth/user-disabled' ||
         err.code == 'auth/user-not-found'){ 
          setEmailError(err.message);
       }
      else if(err.code == 'auth/wrong-password') {
        setPasswordError(err.message);
      }
    })
  };
  

  const handleSignUp = () => {
    clearErrors()
    fire.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      if(err.code == 'auth/email-already-in-use' || 
         err.code == 'auth/invalid-email') {
         setEmailError(err.message);
      }
      else if(err.code == 'auth/weak-password') {
        setPasswordError(err.message);
      }
    })
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    clearInputs()
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        setUser(user)
      } else {
        setUser('');
      }
    })
  };
 useEffect(() => {
  authListener()
 }, [])
  return (
    <div className="App">
    {user ? (<Home handleLogOut={handleLogOut}/>)
         : ( <Login email={email}
       setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        /> )} 
    </div>
  );
}

export default App;
