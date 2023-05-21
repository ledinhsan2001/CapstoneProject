export const path = {
    HOME: "/*",
    LOGIN: "/dang-nhap",
    REGISTER: "/dang-ky",
    MAIN: "/main",
    RENTAL: "/cho-thue",
    BUYSELL: "/mua-ban/",
    SERVICE_PRICE: "/bang-gia-dich-vu",
    BLOG: "/blog",
    DETAIL_REALHOMES__TITLE_ID: "chi-tiet/:title/:id",

    SELL_APARTMENTS: "/ban-can-ho",
    SELL_VILLA: "/ban-biet-thu",
    SELL_FRONT_HOMES: "/ban-nha-mat-tien",
    SELL_OWN_HOME: "/ban-nha-rieng",
    SELL_PROJECT_LAND: "/ban-dat-nen-du-an",
    SELL_LAND: "/ban-dat",
    SELL_HOTELS: "/ban-khach-san",
    SELL_BOARDING_HOMES: "/ban-nha-tro",
    SELL_SHOP: "/ban-cua-hang",
    SELL_WAREHOUSE: "/ban-kho-xuong",

    RENTAL_LAND: "/cho-thue-dat",
    RENTAL_WAREHOUSE: "/thue-kho-xuong",
    RENTAL_HOTELS: "/thue-khach-san",
    RENTAL_APARTMENTS: "/cho-thue-can-ho",
    RENTAL_OFFICE: "/van-phong",
    RENTAL_FRONT_HOMES: "/thue-nha-mat-tien",
    RENTAL_MOTEL_ROOM: "/phong-tro",
    RENTAL_IN_COMPOUND: "/o-ghep",
    RENTAL_WHOLE_HOUSE: "/thue-nha-nguyen-can",
    RENTAL_GROUND: "/mat-bang",
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
        .replace(/[\u0300-\u036f-,]/g, "")
        .split(" ")
        .join("-");
};
