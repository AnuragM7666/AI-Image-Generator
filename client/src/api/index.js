import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => {
    try {
        return await API.get("/post/");
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const CreatePost = async (data) => {
    try {
        return await API.post("/post/", data);
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const GenerateImage = async (data) => {
    try {
        return await API.post("/generateImage/", data);
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

export const deletePost = async (id) => {
    try {
        return await API.delete(`/post/${id}`);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}
