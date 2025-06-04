"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

// This component is used to show a submit button with a loading state when the form is being submitted.
// It uses the useFormStatus hook from react-dom to get the status of the form submission.
// It shows a loading spinner when the form is being submitted and disables the button to prevent multiple submissions.
// It is used in the onboarding page to show a loading state when the user submits the form.
// It is a client component because it uses the useFormStatus hook which is a client-side hook.

interface SubmitButtonProps {
  text?: string;
  variant?:
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text,variant }: SubmitButtonProps) {
  // useFormStatus is a hook that returns the status of the form submission.
  // It returns an object with a pending property that is true when the form is being submitted and false when it is not.

  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2Icon className="size-4 mr-2 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text}{" "}
        </Button>
      )}
    </>
  );
}
