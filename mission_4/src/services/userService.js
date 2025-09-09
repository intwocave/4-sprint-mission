import * as userRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(user) {
  // 이미 가입된 이메일인지 검증
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const err = new Error("User already exists");
    err.statusCode = 422;
    err.data = { email: user.email };
    throw err;
  }

  const createdUserId = await userRepository.createUser(user);

  return createdUserId;
}

export async function getUser({ email, password }) {
  const user = await userRepository.findByEmail(email);

  // If user is invalid
  if (!user) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  // Verifying password
  await verifyPassword(password, user.password);

  // Return without password
  return userRepository.filterSensitiveUserData(user);
}

async function verifyPassword(inputPassword, password) {
  const isVerified = await bcrypt.compare(inputPassword, password);

  if (!isVerified) {
    const err = new Error("Password is wrong");
    err.statusCode = 401;
    throw err;
  }
}

export function createToken(user) {
  const payload = { userId: user.id };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
