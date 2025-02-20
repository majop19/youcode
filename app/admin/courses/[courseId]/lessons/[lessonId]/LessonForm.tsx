"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { LESSON_STATE, LessonSchema } from "./lesson.schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LessonActionEdit } from "./lesson.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type LessonFormProps = {
  defaultValue: LessonSchema & {
    id: string;
  };
};

export const LessonForm = ({ defaultValue }: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      className="flex flex-col gap-4"
      form={form}
      onSubmit={async (values) => {
        const res = await LessonActionEdit({
          lessonId: defaultValue.id,
          data: values,
        });
        if (res?.data) {
          toast.success(res.data);
          router.refresh();
        } else {
          toast.error("Some Error occured", {
            description: res?.serverError?.serverError ?? "unknown error",
          });
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select A State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((lesson) => (
                  <SelectItem value={lesson} key={lesson}>
                    {lesson}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
