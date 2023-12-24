import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './../hooks/auth/supabase'

// Assuming you have a User type defined based on your user structure
type UserType = {}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await supabase.auth.getSession()
      setUser(session || null)
    }

    checkUserSession()

    const {
      data: {}
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session || null)
    })

    return () => {
      // authListener?.data?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user && (router.pathname === '/login' || router.pathname === '/register')) {
      //router.push('/dashboard')
    } else if (!user && router.pathname !== '/login' && router.pathname !== '/register') {
      // router.push('/login')
    }
  }, [user, router.pathname])

  return <>{children}</>
}

export default AuthProvider
