var bcrypt = require("bcryptjs");
import bancanho from "../data/banCanHo.json";
import tracsctiontypes from "../data/transactiontype.json";
import realhometypes1 from "../data/realhometype1.json";
import realhometypes2 from "../data/realhometype2.json";
import { Image } from "../models/image";
import realHome from "../models/realHome";
import { Description } from "../models/description";
import { TransactionType } from "../models/transactionType";
import realHomeType from "../models/realHomeType";
import { User } from "../models/user";
const Role = require("../models/role");
const mongoose = require("mongoose");

const data_body = bancanho.body;
const sub_header_realhomeType = bancanho.title;

const name_realhometype_MuaBan = realhometypes1.headerUrl;
const sub_header_transactionType_MuaBan = realhometypes1.titleHeader.title;

const name_realhometype_ChoThue = realhometypes2.headerUrl;
const sub_header_transactionType_ChoThue = realhometypes2.titleHeader.title;

export const insertDtDbController = async (req, res) => {
    try {
        // //transactionType1: mua ban
        // const tracsctiontype1 = await TransactionType.create({
        //     name: tracsctiontypes[0].category,
        //     sub_header: sub_header_transactionType_MuaBan
        // });
        // //realhometype
        // name_realhometype_MuaBan.forEach(async (item) => {
        //     await realHomeType.create({
        //         name: item.titleUrl,
        //         sub_header: sub_header_realhomeType,
        //         transaction_type: tracsctiontype1,
        //     });
        // });
        // //transactionType2: cho thue
        // const tracsctiontype2 = await TransactionType.create({
        //     name: tracsctiontypes[1].category,
        //     sub_header: sub_header_transactionType_ChoThue
        // });
        // //realhometype
        // name_realhometype_ChoThue.forEach(async (item) => {
        //     await realHomeType.create({
        //         name: item.titleUrl,
        //         sub_header: sub_header_realhomeType,
        //         transaction_type: tracsctiontype2,
        //     });
        // });

        //realhome
        data_body.forEach(async (item) => {
            const password = "123";
            const hash_password = bcrypt.hashSync(password, 8);
            const name = item.userPost.name.split(" ");
            if (!name) {
                name[0] = "";
                name[1] = "";
            }
            if (!name[0]) {
                name[0] = "";
            }
            if (!name[1]) {
                name[1] = "";
            }
            const role = await Role.findOne({ name: "user" });
            let phone = item.userPost.phone;
            if (!phone) {
                phone = "0326687333";
            }
            const user = await User.create({
                first_name: name[0],
                last_name: name[1],
                phone: phone,
                password: hash_password,
                link_zalo: item.userPost.zalo,
                roles: [role],
            });
            const images = await Image.create({
                url: JSON.stringify(item.images),
            });

            const description = await Description.create({
                title_description: item.header,
                short_description: item.sumaryPost.content,
                content_description: item.description.content,
                price: item.attributes[0].price,
                area: item.attributes[0].acreage,
                bedroom: item.attributes[0].bedroom,
                toilet: item.attributes[0].bathroom,
                published: item.attributes[0].published,
            });

            const real_home = await realHome.create({
                user_post: user,
                address: item.address,
                images: images,
                real_home_type_id: "644b5f3fc623234efdaf84d8",
                description: description,
            });

            real_home.save();
            return real_home;
        });
    } catch (error) {
        console.log(error);
    }
};
