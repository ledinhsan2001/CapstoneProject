import React, { useEffect, useState } from "react";
import { SelectAddress } from "../components/";
import { apiGetProvince, apiGetDistrict, apiGetWard } from "../../services";

const Address = ({ payload, setpayload, errors, seterrors }) => {
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);
    const [province, setprovince] = useState("");
    const [district, setdistrict] = useState("");
    const [ward, setward] = useState("");
    const [number_home, setnumber_home] = useState("");

    useEffect(() => {
        if (payload.province_id === "") {
            setprovince("");
            setdistrict("");
            setward("");
            setnumber_home("");
        }
    }, [payload]);

    useEffect(() => {
        const fetchProvinces = async () => {
            const provinces = await apiGetProvince();
            if (provinces.status === 200) {
                setprovinces(provinces.data.results);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        // Province change 2 field district and ward change follow
        setdistrict("");

        const fetchDistrict = async () => {
            const districts = await apiGetDistrict(province);
            if (districts.status === 200) {
                setdistricts(districts.data.results);
            }
        };
        province ? fetchDistrict() : setdistricts(null);
    }, [province]);
    useEffect(() => {
        // Province change 2 field district and ward change follow
        setward("");

        const fetchWard = async () => {
            const wards = await apiGetWard(district);
            if (wards.status === 200) {
                setwards(wards.data.results);
            }
        };
        district ? fetchWard() : setwards(null);
    }, [district]);

    useEffect(() => {
        setpayload((prev) => ({
            ...prev,
            address: `${number_home ? number_home.number_home + "," : ""}${
                ward
                    ? wards?.find((item) => item.ward_id === ward)?.ward_name +
                      ","
                    : ""
            }${
                district
                    ? districts?.find((item) => item.district_id === district)
                          ?.district_name + ","
                    : ""
            }${
                province
                    ? provinces?.find((item) => item.province_id === province)
                          ?.province_name
                    : ""
            }`,
            province_id: province,
            district_id: district,
            ward_id: ward,
        }));
    }, [province, district, ward, number_home]);

    return (
        <div className="flex-col bg-white p-3 rounded-md mt-4 w-full">
            <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                Khu vực
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectAddress
                    title={"Tỉnh/Thành phố"}
                    defaultValue={"--Chọn tỉnh thành phố--"}
                    obligate={"true"}
                    content={provinces}
                    type="province"
                    value={province}
                    setValue={setprovince}
                    errors={errors}
                    seterrors={seterrors}
                    name="province_id"
                />
                <SelectAddress
                    title={"Quận/Huyện"}
                    defaultValue={"--Chọn quận huyện--"}
                    obligate={"true"}
                    content={districts}
                    type="district"
                    value={district}
                    setValue={setdistrict}
                    errors={errors}
                    seterrors={seterrors}
                    name="district_id"
                />
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectAddress
                    title={"Phường/Xã"}
                    defaultValue={"--Chọn phường xã--"}
                    obligate={"true"}
                    content={wards}
                    type="ward"
                    value={ward}
                    setValue={setward}
                    errors={errors}
                    seterrors={seterrors}
                    name="ward_id"
                />
            </div>
            <div className="flex my-3 px-3">
                <SelectAddress
                    title={"Số nhà"}
                    defaultValue={"ví dụ: 100"}
                    simple={"true"}
                    type="number_home"
                    value={number_home}
                    setValue={setnumber_home}
                />
            </div>
            <div className="flex flex-col my-3 px-3 w-full">
                <div className="font-bold my-2 flex">Địa chỉ chính xác</div>
                <input
                    type="text"
                    className="h-[50px] w-[95%] items-center pt-1 px-2 rounded-xl bg-gray-200 cursor-pointer border-solid border-2 border-gray-200 outline-none text-gray-500"
                    readOnly
                    placeholder="Ví dụ: 100 nguyễn lương bằng, hòa khánh bắc, liên chiểu, đàn nẵng"
                    value={`${number_home ? number_home.number_home : ""}${
                        ward
                            ? wards?.find((item) => item.ward_id === ward)
                                  ?.ward_name + ","
                            : ""
                    }${
                        district
                            ? districts?.find(
                                  (item) => item.district_id === district
                              )?.district_name + ","
                            : ""
                    }${
                        province
                            ? provinces?.find(
                                  (item) => item.province_id === province
                              )?.province_name
                            : ""
                    }`}
                />
            </div>
            <div className="flex my-3 px-3">
                <div className="flex flex-col">
                    <div className="font-bold my-2">Vị trí bản đồ</div>
                </div>
            </div>
        </div>
    );
};

export default Address;
