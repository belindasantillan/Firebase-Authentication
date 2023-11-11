import React from "react";
import './App.css';
import { auth } from "./firebase/init";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailandPassword, 
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const[user, setUser] = React.useState({});
  const[loading, setLoading] = React.useState(true);
    
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user)
      }
    })
  },[]);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "password")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
    })
  };

  function login(){
    signInWithEmailandPassword(auth, "email@email.com", "password")
      .then(({user}) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
    })
  };

  function logout(){
    signOut(auth);
    setUser({});
  };


  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
    </div>
  );
}

export default App;
