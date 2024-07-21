import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({ children, authentication = true }) => { //true means render this page otherwise don't render


  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)



  useEffect(() => {
    if (authentication && authStatus !== authentication) {  //suppose to be logged in to see all post but not logged in so redirect to login post
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {  //not suppose to authenticated to see pages(login page, signup page), you are logged in 
      navigate('/')
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}

export default Protected