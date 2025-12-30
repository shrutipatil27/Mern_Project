import { useEffect, useState } from "react";
import { getAllVideos, deleteVideo } from "../../services/videoService";

function AdminVideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getAllVideos();
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this video?")) {
      await deleteVideo(id);
      loadVideos();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin – Videos</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((v) => (
            <tr key={v.id}>
              <td>{v.title}</td>
              <td>{v.course_id}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminVideoList;
