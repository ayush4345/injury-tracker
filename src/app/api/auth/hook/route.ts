import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../server/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, secret } = await req.json();

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return NextResponse.json(
      { message: `You must provide the secret 🤫` },
      { status: 403 },
    );
  }

  if (email) {
    await prisma.user.create({
      data: { email },
    });
    return NextResponse.json(
      { message: `User with email: ${email} has been created successfully!` },
      { status: 200 },
    );
  }
};
