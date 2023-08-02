import { https } from "./config";

export const datVeServ = {
    
  layChiTietPhongVe: (maLichChieu) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu} `
    );
  },
};
