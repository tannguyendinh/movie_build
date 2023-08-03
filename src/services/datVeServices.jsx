import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { https } from "./config";

export const datVeServ = {
  layChiTietPhongVe: (maLichChieu) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu} `
    );
  },

  datVe: (thongTinDatVe = new ThongTinDatVe) => {
    // thongTinDatVe = {
    //   maLichChieu: 0,
    //   danhSachVe: [
    //     // {
    //     //   "maGhe": 0,
    //     //   "giaVe": 0
    //     // }
    //   ],
    // };
    return https.post("/api/QuanLyDatVe/DatVe", thongTinDatVe);
  },
};
