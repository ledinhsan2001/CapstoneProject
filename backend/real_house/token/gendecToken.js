const jwt = require("jsonwebtoken");
const user = require("../models/user");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

exports.updateRefreshToken = async (phone, refreshToken) => {
    try {
        const filer = { phone: phone };
        const udpate = { refresh_token: refreshToken };
        const params = await user.findOneAndUpdate(filer, udpate, {
            new: true,
        });
        return true;
    } catch {
        return false;
    }
};

exports.decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            //ignoreExpiration: true mục đích để dù cho access token đó đã hết hạn nhưng vẫn cho verify.
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};
