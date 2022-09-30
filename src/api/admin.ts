import { OnLineResType } from "../@types/open_im";
import { getAdminUrl } from "../config";
import { request } from "../utils";
import { uuid } from "../utils/open_im_sdk";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile } from "antd/lib/upload";
import store from "../store";


export const getAuthToken = (uid?:string,secret?:string) =>
  request.post(
    "/auth/user_token",
    JSON.stringify({
      secret: secret??"tuoyun",
      platform: 8,
      userID: uid??"openIM123456",
      OperationID:uuid(uid??"uuid")
    }),
    {
      baseURL: getAdminUrl(),
    }
  );

export const getOnline = async (userIDList: string[],token:string, opid?: string):Promise<OnLineResType> =>{
  return request.post(
      "/user/get_users_online_status",
      JSON.stringify({
        operationID: opid ?? uuid("uuid"),
        userIDList,
      }),
      {
        baseURL: getAdminUrl(),
        headers:{
            token
        }
      }
    );
}

export enum minioUploadType {
  file = "1",
  video = "2",
  picture = "3",
}

export const minioUpload = (uploadData: UploadRequestOption, fileType: minioUploadType, snapShot?: RcFile,onProgress?: (progress:number)=>void,opid?: string): Promise<{ data: { URL: string; newName: string } }> => {
  const data = new FormData();
  data.append("file", uploadData.file);
  data.append("fileType", fileType);
  data.append("operationID", opid ?? uuid("uuid"));
  snapShot && data.append("snapShot", snapShot);
  return request.post("/third/minio_upload", data, {
    baseURL: getAdminUrl(),
    headers: {
      "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      token: localStorage.getItem(`improfile`),
    },
    onUploadProgress:function(progressEvent){
      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      onProgress&&onProgress(complete)
    }
  });
};
