import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllVideos, deleteVideo } from '../../services/videoService'

const AdminVideos = () => {
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  const loadVideos = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const result = await getAllVideos(token)

      console.log('Backend API Result:', result)

      // Backend returns: { status: "success", data: [...] }
      if (result?.status === 'success' && Array.isArray(result.data)) {
        setVideos(result.data)
      } else {
        setVideos([])
      }
    } catch (error) {
      console.error('Error loading videos:', error)
      setVideos([])
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  // Delete video

  const onDelete = async (video_id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return

    try {
      const token = sessionStorage.getItem('token')
      const result = await deleteVideo(video_id, token)

      if (result?.status === 'success' || result?.affectedRows > 0) {
        loadVideos()
      } else {
        alert('Failed to delete video')
      }
    } catch (error) {
      alert('Error deleting video')
    }
  }

  return (
    <div className="container-fluid mt-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Video Library</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/AddVideo')}
        >
          + Add New Video
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive bg-white shadow rounded p-3">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>YouTube</th>
              <th>Added On</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {videos.length > 0 ? (
              videos.map(video => (
                <tr key={video.video_id}>
                  <td>{video.video_id}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {video.course_id}
                    </span>
                  </td>
                  <td className="fw-semibold">{video.title}</td>
                  <td>
                    {video.youtube_url ? (
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>
                    {video.added_at
                      ? video.added_at.split('T')[0]
                      : 'N/A'}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`/UpdateVideo/${video.video_id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDelete(video.video_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-muted py-4"
                >
                  No videos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminVideos
