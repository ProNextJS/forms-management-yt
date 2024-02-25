"use server";
import { schema } from "./formSchema";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  if (parsed.data.email.includes("a")) {
    return {
      message: "Invalid email",
      fields: parsed.data,
    };
  }

  return { message: "User registered" };
}
