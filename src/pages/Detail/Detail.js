import React, { useEffect, useState } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { Tabs } from "antd";
import { rapServ } from "../../services/rapServices";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import "./circle.css";



const Detail = (maPhim) => {
  

  const params = useParams();
  const [maPhimDetail, setMaPhimDetail] = useState([]);

  useEffect(() => {
    rapServ
      .layDanhSachLichChieu(params.id)
      .then((res) => {
        console.log(res.data.content);
        setMaPhimDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const renderPhimDetail = () => {
    return maPhimDetail.heThongRapChieu?.map((item, index) => {
      return {
        label: (
          <div>
            <img src={item.logo} alt="" style={{ width: 50, height: 50 }} />

            <p className="  font-bold"> {item.tenHeThongRap}</p>
          </div>
        ),
        key: index,
        children: (
          <div>
            {item.cumRapChieu?.map((cumRap, index) => {
              return (
                <div className=" mt-5" key={index}>
                  <div className="flex flex-row">
                    <img
                      src={item.logo}
                      alt=""
                      style={{ width: 50, height: 50 }}
                    />{" "}
                    <div className="ml-2 ">
                      <p className="text-2xl "> {cumRap.tenCumRap}</p>
                      <p className=" text-gray-500 "> {cumRap.diaChi}</p>
                    </div>
                  </div>
                  <div className="lich-chieu mt-2 grid grid-cols-4">
                    {cumRap.lichChieuPhim
                      ?.slice(0, 12)
                      .map((lichChieu, index) => {
                        return (
                          <NavLink
                            to={`/datve/${lichChieu.maLichChieu}`}
                            key={index}
                            className="col-span-1 text-green-700 font-bold"
                          >
                            {moment(lichChieu.ngayChieuGioChieu).format(
                              "hh:mm A"
                            )}
                          </NavLink>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        ),
      };
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${maPhimDetail.hinhAnh})`,
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{
          minHeight: "100vh",
        }}
        effectColor="##FFFFFF" // required
        color="##FFFFFF" // default color is white
        blur={25} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        {/* Body left */}
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3 me-4">
              <img
                className="col-span-1"
                style={{ width: "100%", height: "100%" }}
                src={maPhimDetail.hinhAnh}
                alt="ảnh chi tiết phim"
              />
              <div
                className="col-span-2 ml-5 text-white "
                style={{ marginTop: "25%" }}
              >
                <p className="text-sm">
                  Ngày chiếu:{" "}
                  {moment(maPhimDetail.ngayKhoiChieu).format("DD.MM.YYYY")}{" "}
                </p>
                <p className="text-4xl ">{maPhimDetail.tenPhim} </p>

                <p className="line-clamp-6 text-gray-300 mt-2 text-sm">
                  {maPhimDetail.moTa}
                </p>
              </div>
            </div>
          </div>

          {/* đánh giá right */}
          <div  className="danhgia col-span-4 ms-6">
            {/* <h1 style={{marginLeft:"10%"}} className="text-green-400 text-2xl">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </h1> */}
            <div className={`c100 p${maPhimDetail.danhGia * 10} big green`}>
              <span className="text-white ">{maPhimDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>

          {/* <div className="col-span-4">
            <p>{maPhimDetail.danhGia}</p>
          </div> */}
        </div>
        <div
          className="container mt-40 ml-60
         w-2/3 bg-gray-200 border-spacing-2 px-5 py-5"
        >
          <Tabs
            tabPosition="left"
            style={{ maxHeight: "400px", overflowY: "scroll" }}
            items={renderPhimDetail()}
          />
         
        </div>
      </CustomCard>
    </div>
  );
};

export default Detail;
