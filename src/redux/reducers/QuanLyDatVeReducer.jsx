import { DAT_GHE } from "../types/QuanLyDatVeType";

const stateDefault = {
  danhSachGheDangDat: [
   
  ],

};


 const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DAT_GHE: {
      console.log("chạy actionnnnnnn",action.payload);
      //push
      // let newGheArr=[...state.danhSachGheDangDat,action.payload]
      // newGheArr.push(action.payload)
      // state.danhSachGheDangDat=newGheArr
      // console.log("newGheArr:", newGheArr)

      // cập nhật danh sách ghế đang đặt 
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.payload.gheDuocChon.maGhe)
      if (index !== -1){
        // xóa đi nếu người dùng nhấp lần thứ 2 
        danhSachGheCapNhat.splice(index,1)
      }else{
        danhSachGheCapNhat.push(action.payload.gheDuocChon )
      }



      return { ...state , 
        danhSachGheDangDat: danhSachGheCapNhat
      }; 
      
    }

    default:
      return { ...state };
  }
 
};
export default QuanLyDatVeReducer;
