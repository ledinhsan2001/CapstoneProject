export const path = {
    HOME: "/*",
    LOGIN: "/dang-nhap",
    REGISTER: "/dang-ky",
    Main: "/main",
    Rental: "/cho-thue",
    BuySell: "/mua-ban",
    ServicePrice: "/bang-gia-dich-vu",
    Blog: "/blog",
};

export const title = {
    HeaderSearch: "TÌM KIẾM NHÀ ĐẤT",
    HeaderMain: "Tìm kiếm bất động sản giá tốt",
    titleSale: "Nhà Đất Bán",
    titleRental: "Nhà Đất Cho Thuê",
};
//Mua bán bất động sản => mua-ban-bat-dong-san
export const formatUniToString = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-");
};
