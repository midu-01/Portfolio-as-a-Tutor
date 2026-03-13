"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizontal } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitInquiryAction } from "@/actions/content-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryInput } from "@/lib/validators";

function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

export function ContactInquiryForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (values: InquiryInput) => {
    startTransition(async () => {
      try {
        const response = await submitInquiryAction(values);
        toast.success(response.message);
        form.reset();
      } catch (error) {
        toast.error("Unable to send your message right now.");
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Guardian or student name" {...form.register("name")} />
          <FormError message={form.formState.errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
          <FormError message={form.formState.errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+8801..." {...form.register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject Need</Label>
          <Input
            id="subject"
            placeholder="SSC Physics / Admission Math"
            {...form.register("subject")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about the student's level, goals, and schedule."
          {...form.register("message")}
        />
        <FormError message={form.formState.errors.message?.message} />
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
          Send inquiry
        </Button>
      </div>
    </form>
  );
}
