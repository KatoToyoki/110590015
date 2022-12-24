import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './App.css';

// For firebase
// import React, { useState } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Routes, Route, Outlet, useSearchParams, useNavigate } from "react-router-dom";

// For firebase
import { database } from './firebase'
import { ref, push, child, update, getDatabase, set, onValue, query } from "firebase/database";




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


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}


export default App;