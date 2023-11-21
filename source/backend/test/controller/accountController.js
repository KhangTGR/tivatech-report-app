const AccountService = require("../service/accountService.js");

const loginAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await AccountService.loginAccount(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const createAccount = async (req, res) => {
  try {
    const { username, name, password, isAdmin } = req.body;
    if (!username || !password || !name || !isAdmin) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await AccountService.createAccount(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  loginAccount,
  createAccount,
};
