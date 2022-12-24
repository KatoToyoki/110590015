

import './App.css';

// For firebase
import React, { useState } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Routes, Route, Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";

// For firebase
import { database } from './firebase'
import { ref, push, child, update, getDatabase, set, onValue, query } from "firebase/database";

import Album from './Album.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="post" element={<Post />} />
          <Route path="album" element={<Album />} /> 
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Title />
      <MySidebar />
      <Outlet />
    </div>
  );
}

function MySidebar() {
  return (
    <div id="header">
      <Sidebar>
        <Menu>
          <MenuItem routerLink={<Link to="/" />}> Home </MenuItem>
          <MenuItem routerLink={<Link to="/search" />}> Search </MenuItem>
          <MenuItem routerLink={<Link to="/post" />}> Post </MenuItem>
          <MenuItem routerLink={<Link to="/album" />}> Album </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

function Title() {
  return (
    <nav className="bg-dark navbar-dark navbar">
      <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Welcome to NTUT Web Programming</h3>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div>
      <h2>This is our Home!</h2>
    </div>
  );
}

// function Album() {
//   return (
//     <div>
//       <h2>This is Album!</h2>
//     </div>
//   );
// }

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    // navigate('/search')
  };

  return (
    <div>
      <h2>Your search term: {searchParams.get('q')}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input name="q" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

// For firebase
// function Post() {
//   const [post, setPost] = useState();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name == 'post') {
//       setPost(value)
//     }
//   }

//   const handleSubmit = (e) => {
//     let obj = {
//       post: post,
//     }

//     // Create a unique key for new posts
//     const newPostKey = push(child(ref(database), 'posts')).key;
//     const updates = {};
//     updates['/posts/' + newPostKey] = obj;
//     update(ref(database), updates);

//     // To prevent the page from reloading; very useful for debugging
//     e.preventDefault()
//   };

//   return (
//     <div>
//       <h2>Submit your post!</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Search:
//           <input name="post" onChange={handleChange} />
//         </label>
//         <input type="submit" value="Post!" />
//       </form>
//     </div>
//   );
// }

function ListItem(props) {
  return <li>{props}</li>;
  // const keys=Object.keys(props);
  // Object.entries(props).forEach(
  //   (key,value)=>{

  //   }
  // );
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      posts: [],
    };
  }

  /* TODO: finish this method */
  getPosts = () => {
    // ================================================
    /* TODO: use the query() method */
    const recentPostsRef = ref(database, 'posts');
    onValue(recentPostsRef, (snapshot) => {
      let newPosts = []
      snapshot.forEach((childSnapshot) => {
        // ====================================================
        /* TODO: parse the childSnapshot and use newPosts.push() 
        to store the key and the post pair. 
        You can use console.log() first to see what childSnapshot looks like. */

        const childKey = childSnapshot.key;
        const childData = childSnapshot.child("post").val();
        // const a = {};
        // a[childKey] = childData;
        newPosts.push(childData)
      });

      // Save the newPosts to the state var.
      this.setState({ posts: newPosts })
    }, {
      // We only need to fetch once
      onlyOnce: true
    });
  }

  componentDidMount() {
    // ====================================================
    /* TODO: call the method to get posts */
    this.getPosts();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'post') {
      this.state.post = value
    }
  }

  handleSubmit = (e) => {
    let obj = {
      post: this.state.post,
    }
    // Create a unique key for new posts
    const newPostKey = push(child(ref(database), 'posts')).key;
    const updates = {};
    updates['/posts/' + newPostKey] = obj;
    update(ref(database), updates);

    // ====================================================
    /* TODO: call the method to get the posts */
    this.getPosts()

    e.preventDefault()
  };

  render() {

    // ====================================================
    const listPosts = this.state.posts.map((i) => <li>{i}</li>)//[ListItem(this.state.posts)];
    /* TODO: convert this.state.posts into a list of <ListItem>. Remember to set the key and the post props */

    return (
      <div>
        <ul>
          {listPosts}
          {/* <li>lll</li> */}
        </ul>
        <h2>Submit your post!</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            New post:
            <input name="post" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Post!" />
        </form>
      </div>
    );
  }
}

export default App;