import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import {
  db,
  collection,
  getDocs,
  onAuthStateChanged,
  auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./components/ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // console.log("authUser is there", authUser);
        // console.log("auth is", auth);
        setUser(authUser);

        // if (authUser.displayName) {
        //   //d o nothing
        // } else {
        //   return updateProfile(auth.currentUser, {
        //     displayName: userName,
        //   });
        // }
      } else {
        setUser(null);
      }
    });

    return () => {
      //cleanup
      unSubscribe();
    };
  }, [user, userName]);

  useEffect(() => {
    async function getPosts(db) {
      const postsCol = collection(db, "posts");
      const postsSnap = await getDocs(postsCol);
      const postsList = postsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          post: doc.data(),
        };
      });
      // console.log("Posts i found", postsList);
      setPosts(postsList);
    }
    getPosts(db);
  }, []);

  function signUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User", user, "userCredential", userCredential);
        return updateProfile(auth.currentUser, {
          displayName: userName,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    setOpen(false);
  }
  function signIn(e) {
    //sign in code
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("signed in successfully", user);
      })
      .catch((e) => console.log("error", e.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      {user?.email ? (
        <ImageUpload userName={user.userName} />
      ) : (
        <h4>Please login to upload</h4>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <h4>Insta logo</h4>
          </center>
          <form action="" className="app__signup">
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />

            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <h4>Insta logo</h4>
          </center>
          <form action="" className="app__signup">
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />

            <Button onClick={signIn}>Log in</Button>
          </form>
        </div>
      </Modal>
      {user ? (
        <Button onClick={() => signOut(auth)}>Log out</Button>
      ) : (
        <div className="app__logInContainer">
          <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
      <div className="app__header">
        <img
          src="https://dummyimage.com/180x40/000/fff"
          alt="logo"
          className="app__headerImage"
        />
      </div>
      {posts.map(({ id, post }) => {
        const { username, imageUrl, caption } = post;
        return (
          <Post
            key={id}
            userName={username}
            imageUrl={imageUrl}
            caption={caption}
          />
        );
      })}
    </div>
  );
}

export default App;
