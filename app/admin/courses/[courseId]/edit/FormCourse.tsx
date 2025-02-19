"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CourseFormSchema } from "./course.schema";
import { courseActionCreate, courseActionEdit } from "./course.action";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue ?? {
      image: "",
      name: "",
      presentation: "",
    },
  });
  const router = useRouter();

  return (
    <Form
      className="flex flex-col gap-4"
      form={form}
      onSubmit={async (values) => {
        const res = defaultValue?.id
          ? await courseActionEdit({
              courseId: defaultValue.id,
              data: values,
            })
          : await courseActionCreate(values);

        if (res?.data) {
          toast.success(res.data.message);

          router.push(`/admin/courses/${res.data.id}`);

          router.refresh();
          return;
        }

        toast.error("Some error occurred", {
          description: res?.serverError?.serverError ?? "unknown Error",
        });

        return;
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Host and use an image. You can use{" "}
              <Link href="https://imgur.com">Imgur</Link> to host your image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="NextReact" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="## Some title" {...field} />
            </FormControl>
            <FormDescription>Markdown is supported.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
