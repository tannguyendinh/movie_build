import { DAT_GHE } from "../types/QuanLyDatVeType";

const stateDefault = {
  danhSachGheDangDat: [
    // {soGhe:1 }
  ],
};

export const QuanLyDatVeReDucer = (state = stateDefault, action) => {
  switch (action.type) {
    case DAT_GHE: {
      console.log(action);
      //push
      return { ...state };
    }

    default:
      return { ...state };
  }
};
