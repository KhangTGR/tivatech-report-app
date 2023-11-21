const Account = require("../model/accountModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAccount = (accountLogin) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = accountLogin;
    try {
      const checkAccount = await Account.findOne({
        username: username,
      });
      if (checkAccount === null) {
        resolve({
          status: "ERR",
          message: "The account is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkAccount.password
      );
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password is incorrect",
        });
      }
      const accessToken = jwt.sign(
        {
          isAdmin: checkAccount.isAdmin,
          username: checkAccount.username,
          name: checkAccount.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30s" }
      );
      // localStorage.setItem("token", {
      //   isAdmin: checkAccount.isAdmin,
      //   username: checkAccount.username,
      //   name: checkAccount.name,
      // });
      resolve({
        status: "OK",
        message: "SUCCESS",
        token: accessToken,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const createAccount = (newAccount) => {
  return new Promise(async (resolve, reject) => {
    const { username, name, password, isAdmin } = newAccount;
    try {
      const checkAccount = await Account.findOne({
        username: username,
      });
      if (checkAccount !== null) {
        resolve({
          status: "ERR",
          message: "The username is already created",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdAccount = await Account.create({
        name,
        username,
        password: hash,
        isAdmin,
      });
      if (createdAccount) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdAccount,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  loginAccount,
  createAccount,
};
