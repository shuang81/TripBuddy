import React, {useEffect, useState} from 'react'
import { Form } from 'react-bootstrap'
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'
// for reference: https://www.npmjs.com/package/imagekitio-react
// https://docs.imagekit.io/getting-started/quickstart-guides/react

const ImageUpload = ({imageFolder, setImageName}) => {

    const [image, setImage] = useState(null)
    const [imageUploadError, setImageUploadError] = useState("")

    useEffect(() => {
        setImageName(image?.name)
    }, [image])

  return (
    <div>
        <div className='file-upload'>
            <IKUpload
            onChange={(e) => setImage(e.target.value)}
            onError={(error) => setImageUploadError(error.message)}
            onSuccess={(response) => setImage(response)}
            validateFile={file => file.size < 2000000}
            folder={`/${imageFolder}`}
            />
            {imageUploadError && <span className='text-danger d-block'>There was an error uploading the image: {imageUploadError}</span>}
        </div>
    
      <IKImage path={`/posts/${image}`} />
    </div>
  )
}

export default ImageUpload