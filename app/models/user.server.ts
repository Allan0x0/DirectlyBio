
import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getClientIPAddress } from 'remix-utils/get-client-ip-address';

import { prisma } from "~/db.server";

import { getErrorMessage } from "./errors";

export type { User } from "@prisma/client";

export function getUserIpAddress(request: Request) {
  // using the request
  const ipAddress = getClientIPAddress(request) || '';
  if (ipAddress) {
    return ipAddress;
  }
  // or using the headers
  return getClientIPAddress(request.headers) || '';
}

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUserRecord(
  email: string,
  accountName: string | undefined,
  password?: string,
  imageUrl?: string,
) {
  const hashedPassword = await bcrypt.hash(password || email, 10);

  return prisma.user.create({
    data: {
      email,
      password: { create: { hash: hashedPassword } },
      accountName: accountName || '',
      avatarId: imageUrl || '',
      desc: '',
    },
  });
}

export async function createUser(
  email: User['email'],
  password: string,
  ipAddress: string,
) {
  try {
    const numDuplicates = await prisma.user.count({
      where: { email },
    });
    if (numDuplicates) {
      return new Error('Email already used');
    }

    const tempRecord = await prisma.tempPageName.findFirst({
      where: { ipAddress },
    });
    const pageName = tempRecord?.pageName.trim().toLowerCase();

    return createUserRecord(email, pageName, password);
  } catch (error) {
    return new Error(getErrorMessage(error));
  }
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
