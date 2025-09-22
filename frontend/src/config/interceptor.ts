import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080" ,/*change url with backend url */
    headers:{
        "Content-Type":"application/json",
    },

});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token= localStorage.getItem("token");
        if(token){
            config.headers.Authorization = 'Bearer ${token}';
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }

);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response ?.status === 401){
            console.warn("Unauthorized! Redirecting to login...");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response ?.status===403){
            console.warn("Forbidden! You don't have permission to access this resource.");
            window.location.href="/login";
        }
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 500) {
            console.error("Internal Server Error! Please try again later.");
            alert("Something went wrong on the server. Please try again later.");
            
        }
        return Promise.reject(error);
    }
);