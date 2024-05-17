import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const createdIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(createdIssue, { status: 201 });
}
