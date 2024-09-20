import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";

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
import { createRecord } from "@/utils/airtableService";
import StatusModal from "@/components/common/Modal";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  queries: z.string().min(5, {
    message: "Quesries must be at least 5 characters.",
  }),
});

export function QueriesForm() {
  const [modalStatus, setModalStatus] = useState(null); // 'success' | 'error' | null
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      queries: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      // console.log(values);
      await createRecord("Queries_table", values, 2);
      setModalStatus('success');
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalStatus('error');
    } finally {
      setLoading(false);
      form.reset();
      setModalOpen(true);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem ref={parent}>
                <FormLabel className="flex">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormMessage className="flex" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="queries"
            render={({ field }) => (
              <FormItem ref={parent}>
                <FormLabel className="flex">Queries</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Queries" {...field} />
                </FormControl>
                <FormMessage className="flex" />
              </FormItem>
            )}
          />
          <Button type="submit"
            disabled={loading}
            className="flex gap-2 mx-auto w-full bg-orange-500 font-semibold transition-all hover:bg-orange-600 disabled:bg-orange-400">
            {loading ? <Loader className="animate-spin" size={20} /> : <span className="flex gap-2 items-center justify-center">Send Now <Rocket className="rotate-45" size={20} /></span>}
          </Button>
        </form>
      </Form>
      <StatusModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        status={modalStatus}
        title={modalStatus === 'success' ? 'Query Submitted Successfully' : 'Submission Error'}
        description={modalStatus === 'success'
          ? 'Thank you for your query. We will get back to you soon.'
          : 'There was an error submitting your query. Please try again later.'}
      />
    </>
  );
}
