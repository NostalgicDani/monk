"use client";

import { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Plus, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/list-actions/create-list";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (list) => {
      toast.success(`List "${list.title}"  created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  if (isEditing)
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white dark:bg-neutral-950 shadow-md space-y-4"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="py-2 h-5 font-medium border-transparent hover:border-input focus:border-input transition focus-visible:ring-0 border-0"
            placeholder="Enter list title..."
          />
          <input hidden defaultValue={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit className="pt-19 dark:bg-neutral-900 dark:text-neutral-100">
              Add List
            </FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );

  return (
    <ListWrapper>
      <button
        type="button"
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 dark:bg-neutral-800/80 dark:hover:bg-neutral-800/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        add a list
      </button>
    </ListWrapper>
  );
};
