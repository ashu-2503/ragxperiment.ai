import { httpService } from "../config/httpService";
import { PathConfig } from "../config/PathConfig";

export const fileService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return await httpService.postFormData(PathConfig.FILE_UPLOAD, formData);
  },

  getFileStatus: async (fileId: number) => {
    return await httpService.get(PathConfig.FILE_STATUS(fileId));
  },

  getAllFiles: async (skip: any, limit: any) => {
    return await httpService.get(`${PathConfig.FILE_LIST}?skip=${skip}&limit=${limit}`);
  },
};
