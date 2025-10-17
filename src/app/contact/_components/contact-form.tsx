"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  TContactSchema,
} from "@/lib/validation/contact.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getErrorMessage, isObjectLike, showErrorToast } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MailIcon, SearchIcon } from "lucide-react";
import { AutosizeTextarea } from "@/components/ui/auto-size";
import { Spinner } from "@/components/ui/spinner";
import { sendContact } from "@/action/send";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (data: TContactSchema) => {
      toast.promise(
        async () => {
          setIsSubmitting(true);
          try {
            const res = await sendContact(data);
            // Error validasi server
            if (!res.status && res.errors && typeof isObjectLike(res.errors)) {
              Object.keys(res.errors).forEach((key) => {
                form.setError(key as keyof TContactSchema, {
                  type: "server",
                  message: res.errors[key],
                });
              });
              throw new Error(res.message);
            }

            console.log(res);
          } catch (err) {
            showErrorToast(err);
          } finally {
            setIsSubmitting(false);
          }
        },
        {
          loading: "Load...",
          success: "Success Sending!",
          error: (err) => getErrorMessage(err),
          position: "top-center",
        },
      );
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      autoComplete="off"
                      placeholder="Your full name"
                      {...field}
                    />
                    <InputGroupAddon>
                      <SearchIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      autoComplete="off"
                      placeholder="you@example.com"
                      {...field}
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message">Message</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    autoComplete="off"
                    id="message"
                    placeholder="Tell me about your project or question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Send Message"}
          </Button>
          <span className="text-sm">We will reply within 2 business days.</span>
        </div>
      </form>
    </Form>
  );
}
