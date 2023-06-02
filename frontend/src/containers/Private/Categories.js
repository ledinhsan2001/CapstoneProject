import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectCategories } from "../components";
import { apiGetRealHomeTypeByTrans } from "../../services";

const Categories = ({ payload, setpayload, errors, seterrors }) => {
    const { transaction_types } = useSelector((state) => state.real_home);
    const [RH_types, setRH_types] = useState([]);
    const [transaction_type_id, settransaction_type_id] = useState("");
    const [real_home_type_id, setreal_home_type_id] = useState("");

    useEffect(() => {
        if (payload.transaction_type_id === "") {
            settransaction_type_id("");
            setreal_home_type_id("");
        }
    }, [payload]);

    useEffect(() => {
        const fetchRHByTrans = async () => {
            const real_home_types = await apiGetRealHomeTypeByTrans(
                transaction_type_id
            );
            if (real_home_types?.data.success === true) {
                setRH_types(real_home_types?.data.data);
            }
        };
        transaction_type_id ? fetchRHByTrans() : setRH_types(null);
    }, [transaction_type_id]);

    useEffect(() => {
        setpayload((prev) => ({
            ...prev,
            transaction_type_id: transaction_type_id,
            real_home_type_id: real_home_type_id,
        }));
    }, [transaction_type_id, real_home_type_id]);

    return (
        <div className="flex-col bg-white p-3 rounded-md w-full">
            <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                Loại giao dịch
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectCategories
                    title={"Loại giao dịch"}
                    defaultValue={"--- Chọn loại giao dịch ---"}
                    content={transaction_types}
                    value={transaction_type_id}
                    setValue={settransaction_type_id}
                    errors={errors}
                    seterrors={seterrors}
                    name="transaction_type_id"
                />
                <SelectCategories
                    title={"Loại bất động sản"}
                    defaultValue={"--- Chọn loại bất động sản ---"}
                    content={RH_types}
                    value={real_home_type_id}
                    setValue={setreal_home_type_id}
                    errors={errors}
                    seterrors={seterrors}
                    name="real_home_type_id"
                />
            </div>
        </div>
    );
};

export default Categories;
