import React from "react";

const InputRegister = ({
    text,
    text1,
    placeholder,
    placeholder1,
    name,
    name1,
    value,
    value1,
    setValue,
    errors,
    seterrors,
    double,
    password,
}) => {
    const MessageErr = (name_err) => {
        let mess = errors.find((item) => item.name === name_err);
        return mess?.message;
    };

    return (
        <div>
            {!double && (
                <div className="w-full flex text-left text-[16px]">
                    <label htmlFor={name} className="w-[40%] mt-2">
                        {text}
                    </label>
                    <div className="flex flex-col w-full">
                        <input
                            id={name}
                            type={password ? `password` : "text"}
                            placeholder={placeholder}
                            value={value}
                            onFocus={() => seterrors([])}
                            onChange={(e) =>
                                setValue((prev) => ({
                                    ...prev,
                                    [name]: e.target.value,
                                }))
                            }
                            className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[80%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                        />
                        <p className="text-red-500 text-left italic">
                            {errors && MessageErr(name)}
                        </p>
                    </div>
                </div>
            )}
            {double && (
                <div className="flex w-full items-center mt-3">
                    <div className="flex">
                        <label htmlFor={name} className="w-[30%] mt-2">
                            {text}
                        </label>
                        <div className="flex flex-col items-center">
                            <input
                                id={name}
                                type="text"
                                placeholder={placeholder}
                                value={value}
                                onFocus={() => seterrors([])}
                                onChange={(e) =>
                                    setValue((prev) => ({
                                        ...prev,
                                        [name]: e.target.value,
                                    }))
                                }
                                className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[80%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                            />
                            <p className="text-red-500 text-left italic w-[80%]">
                                {errors && MessageErr(name)}
                            </p>
                        </div>
                    </div>
                    <div className="ml-[16px] flex">
                        <label htmlFor={name1} className="w-[30%] mt-2">
                            {text1}
                        </label>
                        <div className="flex flex-col items-center">
                            <input
                                id={name1}
                                type="text"
                                placeholder={placeholder1}
                                value={value1}
                                onFocus={() => seterrors([])}
                                onChange={(e) =>
                                    setValue((prev) => ({
                                        ...prev,
                                        [name1]: e.target.value,
                                    }))
                                }
                                className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[80%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                            />
                            <p className="text-red-500 text-left italic  w-[80%]">
                                {errors && MessageErr(name1)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputRegister;
