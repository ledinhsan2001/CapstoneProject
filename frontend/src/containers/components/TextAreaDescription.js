import React from "react";

const TextAreaDescription = ({
    title,
    obliateTitle,
    placeHolder,
    obligate,
    value,
    setValue,
    type,
    errors,
    seterrors,
    name,
}) => {
    return (
        <div className="flex flex-col w-full">
            <div className="font-bold my-2 flex">
                {title}
                {obligate ? <p className="text-red-400">(*)</p> : ""}
            </div>
            <p className="mb-2 text-sm">{obliateTitle}</p>
            {
                <textarea
                    placeholder={placeHolder}
                    name={type}
                    type="text"
                    id={type}
                    onChange={(e) => {
                        setValue((prev) => ({
                            ...prev,
                            [type]: e.target.value,
                        }));
                    }}
                    className={`flex items-center justify-between w-[95%] p-4 ${
                        type === "title_description"
                            ? `min-h-[80px] max-h-[200px]`
                            : `min-h-[160px] max-h-[500px]`
                    } rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer resize-y outline-none overflow-auto`}
                    onFocus={() => seterrors([])}
                ></textarea>
            }
            {errors.map((item, index) => {
                if (item[name]) {
                    return (
                        <p className="text-red-500" key={index}>
                            <i>{item[name]}</i>
                        </p>
                    );
                }
            })}
        </div>
    );
};

export default TextAreaDescription;
