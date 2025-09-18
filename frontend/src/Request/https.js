import axios from "axios";


const https = axios.create({
     baseURL:"http://localhost:2000/"
})

export default https;