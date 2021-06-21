import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer, initialState} from './reducers/UserReducer'
import UserProfile from './components/screens/UserProfile'
import SubscriberUserPosts from './components/screens/SubscriberUserPosts'

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(userContext);
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
      dispatch({type:"USER", payload:user});
    }
    else {
      history.push('/signin');
    }
  }, [])
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowerspost">
        <SubscriberUserPosts />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
