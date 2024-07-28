import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { login, logout } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch((logout()))
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />  {/* if don't have the outlet from react router dom rest of the components will not bo able to render inside this. */}
        </main>
      </div>
      <div className='w-full block'>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
