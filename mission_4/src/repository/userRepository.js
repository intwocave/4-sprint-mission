import prisma from "../../lib/prisma.js";
import bcrypt from 'bcrypt';

export async function createUser(user) {
  const hashedPassword = await hashPassword(user.password);

  const createdUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword, // This line overwrites user.password
    },
  });

  const { id: createdUserId } = filterSensitiveUserData(createdUser);

  return createdUserId;
}

export async function findByEmail(email) {
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return result;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)

  return hash;
}

export function filterSensitiveUserData(user) {
  const { password, ...rest } = user;
  return rest;
}
