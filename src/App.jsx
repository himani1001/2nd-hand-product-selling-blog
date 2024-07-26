import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <main>
            <Outlet />  {/* if don't have the outlet from react router dom rest of the components will not bo able to render inside this. */}
        </main>
      </div>
    </>
  )
}

export default App
