import './App.css';

import Main from './components/main';
// import Layout from './components/sidebar';
import { Routes, Route, Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Main />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
	    </Routes>
      

      {/* <Layout /> */}

      

    </div>
  );
}

function Layout(){
  return(
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/search?q=initial">Search</Link>
      </div>
      <Outlet/>
    </div>
  )
}

function Home(){
    return(
      <div>
        <h2>This is our Home</h2>
      </div>
    )
  }

function Out(){
  return Search
}
  
// function Search() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     navigate('/search')
//   };

//   return (
//     <div>
//       <h2>Your search term: {/* ... */}</h2>
//       <form onSubmit={/* ... */}>
//         {/* ... */}
//       </form>
//      </div>
//   );
// }

// function Search() {
//   let [searchParams, setSearchParams] = useSearchParams();

//   return (
//     <div>
//       {/* <h2>Your search term:</h2> */}
//       <h2 id="v">Your search term:{searchParams.get('content')}</h2>
//       <span>your search term:</span>
//       <input id="content"></input>
//     </div>
//   );
// }

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state={
      content:""
    };
  }

  handleInputChange=(event) => {
    const target=event.target
    const out=target.content
    const name=target.name

    this.setstate({
      [name]:out
    });
  }

  render(){
    return(
      <form>
        <label>
          your search term:
          <input
            name="q"
            content={this.state.content}
          >
          </input>
        </label>

        <button onChange={this.handleInputChange}>submit</button>
        
      </form>
    )
  }
}



export default App;