import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return NextResponse.json({}, { status: 401 });
  }

  if (isNaN(parseInt(params.id))) {
    return NextResponse.json(
      { message: "The param id should be a number" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, description, assignedUserId } = body;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });

    if (user === null) {
      return NextResponse.json(
        { message: "No user found with the given id" },
        { status: 404 }
      );
    }
  }

  const issue = await getIssueById(parseInt(params.id));

  if (issue === null) {
    return NextResponse.json(
      { message: "No issue found with the given id" },
      { status: 404 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assignedUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return NextResponse.json({}, { status: 401 });
  }

  if (isNaN(parseInt(params.id))) {
    return NextResponse.json(
      { message: "The param id should be a number" },
      { status: 400 }
    );
  }

  const issue = await getIssueById(parseInt(params.id));

  if (issue === null) {
    return NextResponse.json(
      { message: "No issue found with the given id" },
      { status: 404 }
    );
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}

async function getIssueById(id: number) {
  return await prisma.issue.findUnique({
    where: {
      id,
    },
  });
}
