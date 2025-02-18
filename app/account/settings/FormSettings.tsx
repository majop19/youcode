"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUser } from "./action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const formSchema = z.object({
  image: z.string().url(),
  name: z.string().min(3).max(40),
});

export type FormSettings = z.infer<typeof formSchema>;

export type FormProps = {
  id: string;
  email?: string;
  image?: string;
  name?: string;
};

export function FormSettings(user: FormProps) {
  const isClient = useIsClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: user.image,
      name: user.name,
    },
  });

  async function onSubmit(values: FormSettings) {
    await updateUser(user.id, { ...values });
    window.location.assign("/account");
  }

  if (!isClient) return;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const useIsClient = () => {
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, [isClient]);

  return isClient;
};
