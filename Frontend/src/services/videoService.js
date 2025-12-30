import axios from "axios";
import config from "./config";
// VIDEO SERVICES

// GET ALL VIDEOS (ADMIN)

export async function getAllVideos(token) {
  const URL = `${config.BASE_URL}/video/all-videos`;

  const response = await axios.get(URL, {
    headers: {
      token: token
    }
  });

  return response.data;
}


// GET COURSE VIDEOS (STUDENT)

export const getCourseVideos = async (token) => {
  return await getAllVideos(token);
};

// ADD VIDEO

export async function addVideo(videoData, token) {
  const URL = `${config.BASE_URL}/video/add`;

  const response = await axios.post(URL, videoData, {
    headers: {
      token: token
    }
  });

  return response.data;
}

// UPDATE VIDEO

export async function updateVideo(video_id, videoData, token) {
  const URL = `${config.BASE_URL}/video/update/${video_id}`;

  const response = await axios.put(URL, videoData, {
    headers: {
      token: token
    }
  });

  return response.data;
}

// DELETE VIDEO

export async function deleteVideo(video_id, token) {
  const URL = `${config.BASE_URL}/video/delete/${video_id}`;

  const response = await axios.delete(URL, {
    headers: {
      token: token
    }
  });

  return response.data;
}

// GET VIDEO BY ID

export async function getVideoById(video_id, token) {
  const URL = `${config.BASE_URL}/video/${video_id}`;

  const response = await axios.get(URL, {
    headers: {
      token: token
    }
  });

  return response.data;
}
