// context.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});
    const url = process.env.REACT_APP_SERVER_URL

    const getUserProfile = async () => {
      const response = await axios.get(`${url}/profile`, { headers: {
          'Authorization': 'Bearer ' + token
      }})
      setUser(response?.data)
      setUserId(response?.data?._id)
    }

    const saveToken = (token) => {
      localStorage.setItem('token', token);
      setToken(token)
    }

    const getToken = () => {
      const updatedToken = localStorage.getItem('token');
      setToken(updatedToken)
      return updatedToken;
    }

    const removeToken = () => {
      localStorage.removeItem('token');
    }

    const value = { 
      userId: userId,
      setUserId: setUserId,
      token: token,
      setToken: setToken,
      user: user, 
      setUser: setUser,
      saveToken: saveToken,
      getToken: getToken,
      removeToken: removeToken,
    }

    useEffect(() => {
      getToken()
    }, [])

    useEffect(() => {
      if (token){
        getUserProfile()
      }
    }, [token])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        )
  }
  

  const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within a AuthContextProvider')
    }
    return context
  }
  
  export {AuthContextProvider, useAuth}