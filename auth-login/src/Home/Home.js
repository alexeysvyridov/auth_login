import React from 'react';
const Home = ({handleLogOut}) => {
  return (
    <section className="hero">
      <nav>
        <h2>Welcome to Home page</h2>
        <button onClick={handleLogOut}>log out</button>
      </nav>
    </section>
  )
}
export default Home;