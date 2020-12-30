import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    setHasAccount,
    hasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input 
        type="text" 
        autoFocus required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}  
        />
        <p className="errorMcg">{emailError}</p>
        <label>Password</label>
        <input type="password"
         required 
         value={password} 
         onChange={(e) => setPassword(e.target.value)}/>
        <p className="errorMcg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign In</button>
              <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
            </>
          ) : (
            <>
            <button onClick={handleSignUp}>Sign up</button>
              <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
            </>
          )}
        </div>
      </div>
    </section>
  )
};
export default Login;
