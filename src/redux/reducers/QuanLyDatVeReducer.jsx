import { DAT_GHE } from "../types/QuanLyDatVeType";

const stateDefault = {
  danhSachGheDangDat: [
    {soGhe:"1" }
  ],
};

 const QuanLyDatVeReDucer = (state = stateDefault, action) => {
  switch (action.type) {
    case DAT_GHE: {
      console.log("chạy actionnnnnnn",action.payload);
      //push
      // let newGheArr=[...state.danhSachGheDangDat]
      // newGheArr.push(action.payload)
      // state.danhSachGheDangDat=newGheArr

      // // cập nhật danh sách ghế đang đặt 
      // let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      // let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)
      // if (index !== -1){
      //   // tìm thấy ghế trong mảng có nghĩa trc đó đã chọn vào rồi xóa đi 
      //   danhSachGheCapNhat.splice(index,1)
      // }else{
      //   danhSachGheCapNhat.push(action.gheDuocChon )
      // }



      return { ...state 
        // , danhSachGheDangDat:danhSachGheCapNhat
      };
    }

    default:
      return { ...state };
  }
};
export default QuanLyDatVeReDucer;
