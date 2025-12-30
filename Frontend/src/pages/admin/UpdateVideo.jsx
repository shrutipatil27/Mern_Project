
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getVideoById, updateVideo } from '../../services/videoService'

const UpdateVideo = () => {
  const { videoId } = useParams()
  const navigate = useNavigate()
  
  const [course_id, setCourseId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtube_url, setYoutubeUrl] = useState('')

  useEffect(() => {
    const fetchVideo = async () => {
      const token = sessionStorage.getItem('token')
      const result = await getVideoById(videoId, token)
      // Extracts the first element if data is an array
      const data = result.data && result.data[0] ? result.data[0] : result.data
      if (data) {
        setCourseId(data.course_id)
        setTitle(data.title)
        setDescription(data.description)
        setYoutubeUrl(data.youtube_url)
      }
    }
    fetchVideo()
  }, [videoId])

  const onUpdate = async () => {
    const token = sessionStorage.getItem('token')
    const body = { course_id, title, description, youtube_url }
    const result = await updateVideo(videoId, body, token)
    if (result.status === 'success') {
      alert('Video Details Updated!')
      navigate('/AdminVideos')
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: '550px', borderRadius: '12px' }}>
        <h4 className="text-center mb-4 text-warning fw-bold">Edit Video Information</h4>
        <div className="mb-3">
          <label className="form-label">Course ID</label>
          <input value={course_id} type="number" className="form-control" onChange={e => setCourseId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input value={title} type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea value={description} className="form-control" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">YouTube URL</label>
          <input value={youtube_url} type="text" className="form-control" onChange={e => setYoutubeUrl(e.target.value)} />
        </div>
        <button onClick={onUpdate} className="btn btn-warning w-100 py-2">Update Changes</button>
      </div>
    </div>
  )
}
export default UpdateVideo