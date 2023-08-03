import React, { Fragment, useEffect, useState } from "react";
import { layDuLieuLocal } from "../../utils/localStore";
import style from "./CheckOut.module.css";
import "./CheckOut.css";
import { datVeServ } from "../../services/datVeServices";
import { useNavigate, useParams } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DAT_GHE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { datVe } from "../../redux/actions/QuanLyDatVeAction";

// import {  QuanLyDatVeReducer} from "./../../redux/reducers/QuanLyDatVeReducer";

const CheckOut = () => {
  // const { danhSachGheDangDat} =useSelector(state=>state.QuanLyDatVeReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dsGheDangDat = useSelector(
    (state) => state.QuanLyDatVeReducer?.danhSachGheDangDat
  );
  // console.log("check ghe reducer", dsGheDangDat)

  const user = layDuLieuLocal("user");
  // console.log("tài khoản ng dùng", user)
  const params = useParams();
  const [chiTietPhongVe, setChiTietPhongVe] = useState([]);

  const [loadLaiTrang, setLoadLaiTrang] = useState(false);

  useEffect(() => {
    // check nếu ko có emai sẽ chuyển hướng đến trang đăng nhập
    if (!user || !user.email) {
      window.location.href = "/login";
      return null;
    }
    datVeServ
      .layChiTietPhongVe(params.id)
      .then((res) => {
        console.log(res.data.content);
        setChiTietPhongVe(res.data.content);
        setLoadLaiTrang(false); // Đã tải lại dữ liệu,
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id, loadLaiTrang]);

  const gheInfo = chiTietPhongVe?.danhSachGhe;

  const renderHangGhe = () => {
    return gheInfo?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";

      // kiểm tra ghế đang đặt
      let indexGheDD = dsGheDangDat?.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      // let classGheDaDuocDat = "";
      // if(userLogin?.taiKhoan ===ghe.taiKhoanNguoiDat){
      //   classGheDaDuocDat = "gheDuocDat"
      // }

      if (indexGheDD != -1) {
        classGheDangDat = "gheDangDat";
      }
      /****************/
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_GHE,
                payload: { gheDuocChon: ghe },
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat}  items-center`}
            key={index}
          >
            {ghe.daDat ? (
              <CloseCircleOutlined
                style={{ display: "block", color: "white" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  // nút đặt vé
  const buttonDatVe = () => {
    const thongTinDatVe = new ThongTinDatVe();
    thongTinDatVe.maLichChieu = params.id;
    thongTinDatVe.danhSachVe = dsGheDangDat;

    dispatch(datVe(thongTinDatVe))
      .then(() => {
        // thông báo đặt thành công
        window.alert("Đặt vé thành công!");

        // Đặt vé thành công, tải lại trang
        window.location.reload();
      })
      .catch((error) => {
        console.log("Đặt vé thất bại:", error);
      });
  };

  //  tính tổng tiền
  const tinhTongTien = () => {
    let tongTien = dsGheDangDat.reduce((tongTien, ghe, index) => {
      return tongTien + ghe.giaVe;
    }, 0);
    return tongTien.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const phimInfo = chiTietPhongVe?.thongTinPhim;
  return (
    <div className=" min-h-screen mt-5">
      <div className="grid grid-cols-12">
        {/* phần đặt vé  */}
        <div className="Man_Hinh col-span-9">
          <div className="flex justify-center mt-5">
            <div></div>

            <div className={`${style["trapezoid"]}`}>
              <p className="text-center mt-5 font-bold ">Màn Hình</p>
              <div className="text-center text-white mt-5">
                {renderHangGhe()}
              </div>
            </div>
          </div>
        </div>

        {/* hiển thị thông tin đặt vé  */}
        <div className="Dat_Ve col-span-3 ">
          <h3 className="text-green-400 text-center text-4xl font-bold mt-5">
            {tinhTongTien()}
          </h3>
          <hr />
          <h3 className="text-xl mt-2 font-bold ">{phimInfo?.tenPhim}</h3>
          <p className="text-sm">
            Địa điểm: {phimInfo?.tenCumRap} - {phimInfo?.tenRap}
          </p>
          <p className="text-sm">
            Ngày chiếu: {phimInfo?.ngayChieu} - {phimInfo?.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Số Ghế: </span>

              {_.sortBy(dsGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span
                    key={index}
                    className="font-bold text-green-500 text-lg"
                  >
                    {" "}
                    {gheDD.stt} ,
                  </span>
                );
              })}
            </div>
          </div>
          <hr />
          <p className="">Tổng Tiền</p>
          <div className="text-right col-span-1">
            <span className="text-green-800 text-lg">{tinhTongTien()}</span>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            <p className="font-bold text-1xl">{user?.email}</p>
          </div>
          <hr />
          <div className="my-5">
            <i>Số ĐT</i> <br />
            <p className="font-bold text-1xl">{user?.soDT}</p>
          </div>
          <hr />

          <div
            className="mb-0 h-30 flex flex-col  items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              onClick={buttonDatVe}
              className="dat_ve bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              Đặt Vé
            </div>
          </div>
          <div className="ve_trang_chu text-right">
            <button
              onClick={() => navigate("/")}
              className="mt-11  font-sm border-spacing-2"
            >
              Trở lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckOut;
