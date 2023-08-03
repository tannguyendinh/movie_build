import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { datVeServ } from "../../services/datVeServices";

export const datVe = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      const result = await datVeServ.datVe(thongTinDatVe);
      console.log(result.data.content);
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
