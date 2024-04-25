'use client'
import { useRef } from 'react'

const UploadPage = () => {
  const fileInputRef = useRef(null)

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0]

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:3000/api/apps/upload/', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input type='file' ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  )
}

export default UploadPage
