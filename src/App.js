import React from "react";
import './App.css';
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailandPassword, 
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


function App() {
  const[user, setUser] = React.useState({});
  const[loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardCodedId = "3U3wC4V5KKfykUtHevNG";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a $300k job",
    };
    updateDoc(postRef, newPost);
  };

  function deletePost() {
    const hardCodedId = "3U3wC4V5KKfykUtHevNG";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Finish Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  };

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
  };

  async function getPostById(id) {
    // const hardCodedId = "3U3wC4V5KKfykUtHevNG";
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  };

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  };
    
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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
