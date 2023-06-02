export const validate_data = (finalPayload, seterrors) => {
    let count = 0;
    const arrpayload = Object.entries(finalPayload);
    arrpayload.forEach((item) => {
        if (item[1] === "") {
            seterrors((prev) => [
                ...prev,
                {
                    [item[0]]: "Vui lòng chọn trường!",
                },
            ]);
            count++;
            return;
        }
        if (item[0] === "description") {
            let arrobj = Object.entries(item[1]);
            arrobj.forEach((i) => {
                if (
                    i[0] === "short_description" ||
                    i[0] === "bedroom" ||
                    i[0] === "toilet"
                ) {
                    return;
                }
                if (i[0] === "price" || i[0] === "area") {
                    if (!i[1]) {
                        seterrors((prev) => [
                            ...prev,
                            {
                                [i[0]]: "Vui lòng nhập giá trị!",
                            },
                        ]);
                        count++;
                        return;
                    }
                }
                if (i[0] === "title_description") {
                    if (i[1].length <= 10) {
                        seterrors((prev) => [
                            ...prev,
                            {
                                [i[0]]: "Vui lòng nhập hơn 10 ký tự!",
                            },
                        ]);
                        count++;
                        return;
                    }
                }
                if (i[0] === "content_description") {
                    if (i[1].length <= 50) {
                        seterrors((prev) => [
                            ...prev,
                            {
                                [i[0]]: "Vui lòng nhập hơn 50 ký tự!",
                            },
                        ]);
                        count++;
                        return;
                    }
                }
                if (!i[1]) {
                    seterrors((prev) => [
                        ...prev,
                        {
                            [i[0]]: "Vui lòng chọn trường!",
                        },
                    ]);
                    count++;
                    return;
                }
            });
        }
        if (item[0] === "images") {
            const url = item[1].url;
            if (url.length === 0) {
                seterrors((prev) => [
                    ...prev,
                    {
                        images: "Yêu cầu phải có ảnh!",
                    },
                ]);
                count++;
                return;
            }
        }
    });
    return count;
};
