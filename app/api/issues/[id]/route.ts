import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (isNaN(parseInt(params.id))) {
    return NextResponse.json(
      { message: "The param id should be a number" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (validation.success === false) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

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
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
