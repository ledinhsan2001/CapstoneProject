const { User } = require("../models/user");
const Role = require("../models/role");
const secret = require("../settings");
var bcrypt = require("bcryptjs");
const Token = require("../token/gendecToken");
const randToken = require("rand-token");
const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");

const loginController = async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone: phone });
    if (user) {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
            // tao token với thông tin là id
            const dataForAccessToken = {
                id: user._id,
            };
            const accessToken = await Token.generateToken(
                dataForAccessToken,
                secret.secret,
                secret.expiresIn
            );
            if (!accessToken) {
                return res.status(401).send({
                    error: "Đăng nhập không thành công, vui lòng thử lại.",
                });
            }
            const refreshToken = randToken.generate(50); // tạo 1 refresh token ngẫu nhiên
            if (!refreshToken) {
                return res.status(401).send({
                    error: "Đăng nhập không thành công, vui lòng thử lại.",
                });
            }

            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await Token.updateRefreshToken(user.phone, refreshToken);

            const roleId = user.roles[0];
            const nameRole = await Role.findById({ _id: roleId });
            res.status(200).json({
                message: "Đăng nhập thành công.",
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                roles: ["ROLE_" + nameRole.name.toUpperCase()],
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } else {
            return res
                .status(400)
                .json({ accessToken: null, error: "Mật khẩu không đúng!" });
        }
    } else {
        return res.status(400).json({ error: "Tài khoản không tồn tại." });
    }
};

const registerController = catchAsync(async (req, res) => {
    const { first_name, last_name, phone, password } = req.body;
    const existUsername = await User.findOne({ phone: phone });
    if (existUsername == 0) {
        const user = new User({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            password: bcrypt.hashSync(password, 8),
        });
        const role = await Role.findOne({ name: "user" });
        if (role) {
            user.roles = [role];
        }
        const success = await user.save().then((user) => {
            user.password = undefined;
            res.status(201).send({
                message: "User was registered successfully!",
                data: user,
            });
        });
        if (!success) {
            return res.status(400).json({ error: "Lỗi đăng ký tài khoản. " });
            // throw new ApiError(500, "Lỗi đăng ký tài khoản.");
        }
    } else {
        // throw new ApiError(500, "tài khoản này đã tồn tại!");
        return res.status(400).json({ error: "tài khoản này đã tồn tại!" });
    }
});

const refreshTokenController = async (req, res) => {
    // Lấy access token từ header

    // let token = req.headers["x-access-token"];// or
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send({ error: "Không tìm thấy access token." });
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send({ error: "Không tìm thấy refresh token." });
    }

    // Decode access token đó
    const decoded = await Token.decodeToken(
        accessTokenFromHeader,
        secret.secret
    );
    if (!decoded) {
        return res.status(400).send({ error: "Access token không hợp lệ." });
    }

    const id = decoded.payload.id; // Lấy username từ payload

    const user = await User.findById({ _id: id });
    if (!user) {
        return res.status(401).send({ error: "User không tồn tại." });
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send({ error: "Refresh token không hợp lệ." });
    }

    // Tạo access token mới
    const dataForAccessToken = {
        id: user._id,
    };

    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        secret.secret,
        secret.expiresIn
    );
    if (!accessToken) {
        return res.status(400).send({
            error: "Tạo access token không thành công, vui lòng thử lại.",
        });
    }
    return res.json({
        accessToken: accessToken,
    });
};

const authController = {
    loginController,
    registerController,
    refreshTokenController,
};
module.exports = authController;
