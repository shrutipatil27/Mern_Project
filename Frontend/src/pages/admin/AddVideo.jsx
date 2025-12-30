import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addVideo } from '../../services/videoService'

const AddVideo = () => {
  const [course_id, setCourseId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtube_url, setYoutubeUrl] = useState('')
  const navigate = useNavigate()

  const onSave = async () => {
    const token = sessionStorage.getItem('token')
    const body = { course_id, title, description, youtube_url }
    
    const result = await addVideo(body, token)
    if (result.status === 'success') {
      alert('Video Added Successfully!')
      navigate('/AdminVideos')
    } else {
      alert('Error: ' + result.error)
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: '550px', borderRadius: '12px' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Upload Video</h3>
        <div className="mb-3">
          <label className="form-label">Course ID</label>
          <input type="number" className="form-control" onChange={e => setCourseId(e.target.value)} placeholder="Enter Numeric Course ID" />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">YouTube URL</label>
          <input type="text" className="form-control" onChange={e => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/..." />
        </div>
        <button onClick={onSave} className="btn btn-primary w-100 py-2 mt-2">Save Video</button>
        <button onClick={() => navigate('/adminVideos')} className="btn btn-light w-100 mt-2">Cancel</button>
      </div>
    </div>
  )
}
export default AddVideo