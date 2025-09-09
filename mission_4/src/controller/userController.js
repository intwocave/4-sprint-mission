import * as userService from "../services/userService.js";

// for Creating user
export async function createUser(req, res, next) {
  const { email, nickname, password } = req.body;

  if (!email || !nickname || !password) {
    const err = new Error("Required parameter is missing");
    err.statusCode = 400;
    next(err);
  }

  try {
    const userId = await userService.createUser(req.body);

    return res.status(200).json(userId);
  } catch (err) {
    next(err);
  }
}

// for Login
export async function getUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Email or password is wrong");
    err.statusCode = 404;
    next(err);
  }

  try {
    const user = await userService.getUser(req.body);
    const accessToken = userService.createToken(user);

    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
}
