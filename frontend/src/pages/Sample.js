import React, {useContext} from 'react'
import ImageUpload from '../components/ImageUpload'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { useAuth } from '../context/authContext';

const Sample = () => {
  
  const { token, user } = useAuth();
    return (
    <div>
        <h2>Sample Page for testing</h2>
        <ImageUpload imageFolder={'posts'}/>

        <div>
          <h1>The value is: {token}</h1>
          <h1>The value2 is: {user?.firstName}</h1>
        </div>
    </div>
  )
}

export default Sample