export const AXIOSURL = "http://127.0.0.1:10004"
export const AXIOSTIMEOUT = 60000
export const ADMINURL = "http://127.0.0.1:10002"
export const IMURL = "ws://127.0.0.1:10003"
export const PICMESSAGETHUMOPTION = "?imageView2/1/w/200/h/200/rq/80"
export const LANGUAGE = "zh-cn"

export const getIMUrl = () => localStorage.getItem("IMUrl")?localStorage.getItem("IMUrl")!:IMURL
export const getAxiosUrl = () => localStorage.getItem("IMAxiosUrl")?localStorage.getItem("IMAxiosUrl")!:AXIOSURL
export const getAdminUrl = () => localStorage.getItem("IMAdminUrl")?localStorage.getItem("IMAdminUrl")!:ADMINURL
export const getLanguage = () => localStorage.getItem("IMLanguage")?localStorage.getItem("IMLanguage")!:LANGUAGE
export const OBJECTSTORAGE: "cos" | "minio" = "minio"
