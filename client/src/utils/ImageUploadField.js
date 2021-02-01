import React from 'react'
import axios from 'axios'
import { Message } from 'semantic-ui-react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUploadField({ onChange, labelText, name, value }) {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } })
  }

  return (
    <>
      {value ?
        <>
          <label className="label">{labelText || 'Upload Image'}</label>
          <input
            className="input"
            type="file"
            placeholder="select other image"
            onChange={handleUpload}
            name={name}
      
          />
          <Message
            success
            header='Image Uploaded'
            content="Image Successfully Uploaded"
          />
        </>
        :
        <>
          <label className="label">{labelText || 'Upload Image'}</label>
          <input
            className="input"
            type="file"
            onChange={handleUpload}
            name={name}
          />
        </>
      }
    </>
  )
}

export default ImageUploadField