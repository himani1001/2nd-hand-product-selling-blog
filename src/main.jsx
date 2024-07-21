import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AuthLayouts from './components/AuthLayouts.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([{
  path: "/",  //element to be rendered when somebody visit this path
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: (
        <AuthLayouts authentication = {false}>
          <Login />
        </AuthLayouts>
      )
    },
    {
      path: '/signup',
      element: (
        <AuthLayouts authentication = {false}>
          <Signup />
        </AuthLayouts>
      )
    },
    {
      path: '/all-posts',
      element: (
        <AuthLayouts authentication = {true}> {/* only logged in ones can see the products */}
          <AllPosts />
        </AuthLayouts>
      )
    },
    {
      path: '/add-posts',
      element: (
        <AuthLayouts authentication = {true}> {/* only logged in ones can see the products */}
          <AddPost />
        </AuthLayouts>
      )
    },
    {
      path: '/edit-post/:slug',  // : = which post you want to go
      element: (
        <AuthLayouts authentication = {true}> {/* only logged in ones can see the products */}
          <EditPost />
        </AuthLayouts>
      )
    },
    {
      path: '/post/:slug',  // : = which post you want to go
      element: (
        <AuthLayouts authentication = {true}> {/* only logged in ones can see the products */}
          <Post />
        </AuthLayouts>
      )
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>,
)
