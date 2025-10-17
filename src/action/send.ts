"use server";

import { EmailTemplate } from "@/app/contact/_components/email-template";
import ActionErrorHandler from "@/lib/action-error-handler";
import { getErrorMessage } from "@/lib/utils";
import { contactSchema } from "@/lib/validation/contact.validation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(body: unknown) {
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return ActionErrorHandler.handleZod(parsed.error);
  }

  const { name, email, message } = parsed.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Irfin Falah <onboarding@resend.dev>",

      to: ["irfin0falah@gmail.com"],
      subject: `New message from ${name}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return { status: false, errors: null, message: error.message };
    }

    return { status: true, data, message: "Success send email" };
  } catch (error) {
    return { status: false, errors: null, message: getErrorMessage(error) };
  }
}
