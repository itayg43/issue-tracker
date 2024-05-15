"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>();

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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
