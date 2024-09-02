"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Rocket } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  quesries: z.string().min(2, {
    message: "Quesries must be at least 2 characters.",
  }),
});

export function QueriesForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      quesries: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage className="flex"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quesries"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">Quesries</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Queries" {...field} />
              </FormControl>
              <FormMessage className="flex"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="flex gap-2 mx-auto w-full bg-orange-500 font-semibold transition-all hover:bg-orange-600">Send Now <span className="rotate-45"><Rocket /></span></Button>
      </form>
    </Form>
  );
}
