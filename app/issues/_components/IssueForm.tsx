"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Props = {
  issue?: Issue;
};

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const [isSubmittingFailed, setIsSubmittingFailed] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmittingFailed(true);
    }
  });

  return (
    <div className="max-w-xl">
      {isSubmittingFailed && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>An unexpected error occurred.</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            defaultValue={issue?.title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field: { value, onChange, onBlur } }) => (
            <SimpleMDE
              placeholder="Description"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;