import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/AuthLayouts.jsx'
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
        <Protected authentication={false}>
          <Login />
        </Protected>
      )
    },
    {
      path: '/signup',
      element: (
        <Protected authentication={false}>
          <Signup />
        </Protected>
      )
    },
    {
      path: '/all-posts',
      element: (
        <Protected authentication={true}> {/* only logged in ones can see the products */}
          <AllPosts />
        </Protected>
      )
    },
    {
      path: '/add-posts',
      element: (
        <Protected authentication={true}>
          <AddPost />
        </Protected>
      )
    },
    {
      path: '/edit-post/:slug',  // : = which post you want to go, this :slug is the reason why we are able to grab a slug from useParams in Post.jsx
      element: (
        <Protected authentication={true}>
          <EditPost />
        </Protected>
      )
    },
    {
      path: '/post/:slug',
      element: (
        <Protected authentication={true}>
          <Post />
        </Protected>
      )
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
