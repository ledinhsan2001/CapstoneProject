export const validate_data = (finalPayload, seterrors) => {
    // item[0], item[1] => {price: "3tỷ"}
    let count = 0;
    const arrpayload = Object.entries(finalPayload);
    arrpayload.forEach((item) => {
        if (
            item[0] === "short_description" ||
            item[0] === "bedroom" ||
            item[0] === "toilet" ||
            item[0] === "number_home"
        ) {
            return;
        }
        if (item[0] === "price" || item[0] === "area") {
            if (!item[1]) {
                seterrors((prev) => [
                    ...prev,
                    {
                        name: item[0],
                        message: "Vui lòng nhập giá trị!",
                    },
                ]);
                count++;
                return;
            }
        }
        if (item[0] === "title_description") {
            if (item[1].length <= 10) {
                seterrors((prev) => [
                    ...prev,
                    {
                        name: item[0],
                        message: "Vui lòng nhập hơn 10 ký tự!",
                    },
                ]);
                count++;
                return;
            }
        }
        if (item[0] === "content_description") {
            if (item[1].length <= 50) {
                seterrors((prev) => [
                    ...prev,
                    {
                        name: item[0],
                        message: "Vui lòng nhập hơn 50 ký tự!",
                    },
                ]);
                count++;
                return;
            }
        }
        if (item[1] === "") {
            seterrors((prev) => [
                ...prev,
                {
                    name: item[0],
                    message: "Vui lòng chọn trường!",
                },
            ]);
            count++;
            return;
        }
        if (item[0] === "images") {
            const url = item[1].url;
            if (url.length === 0) {
                seterrors((prev) => [
                    ...prev,
                    {
                        name: "images",
                        message: "Yêu cầu phải có ảnh!",
                    },
                ]);
                count++;
                return;
            }
        }
    });
    return count;
};
