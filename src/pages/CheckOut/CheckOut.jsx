import React, { Fragment, useEffect, useState } from "react";
import { layDuLieuLocal } from "../../utils/localStore";
import style from "./CheckOut.module.css";
import "./CheckOut.css";
import { datVeServ } from "../../services/datVeServices";
import { useParams } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DAT_GHE } from "../../redux/types/QuanLyDatVeType";

// import {  QuanLyDatVeReducer} from "./../../redux/reducers/QuanLyDatVeReducer";

const CheckOut = () => {
  // const { danhSachGheDangDat} =useSelector(state=>state.QuanLyDatVeReducer)
  const dispatch = useDispatch();
  const danhSachGheDangDat = useSelector((state) => state.QuanLyDatVeReducer);
  console.log("check ghe reducer", danhSachGheDangDat);

  const user = layDuLieuLocal("user");
  // console.log("tài khoản ng dùng", user)
  const params = useParams();
  const [chiTietPhongVe, setChiTietPhongVe] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const gheInfo = chiTietPhongVe?.danhSachGhe;

  const renderHangGhe = () => {
    return gheInfo?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";

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
            className={`ghe ${classGheVip} ${classGheDaDat} items-center`}
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

  const phimInfo = chiTietPhongVe?.thongTinPhim;
  return (
    <div className=" min-h-screen mt-5">
      <div className="grid grid-cols-12">
        {/* phần đặt vé  */}
        <div className="col-span-9">
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
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-4xl font-bold"> 0đ</h3>
          <hr />
          <h3 className="text-xl mt-2 font-bold ">{phimInfo?.tenPhim}</h3>
          <p>
            Địa điểm: {phimInfo?.tenCumRap} - {phimInfo?.tenRap}
          </p>
          <p>
            Ngày chiếu: {phimInfo?.ngayChieu} - {phimInfo?.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">
                ghế
                
               
              </span>
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">0đ</span>
            </div>
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
            className="mb-0 h-full flex flex-col  items-center"
            style={{ marginBottom: 0 }}
          >
            <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
              Đặt Vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckOut;
