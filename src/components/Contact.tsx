"use client";

import { useActionState, useState } from "react";
import { submitContact } from "@/app/actions";

const initialState = { success: false, error: undefined };

export default function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  function handleReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormValues({
      name: data.get("name") as string,
      email: data.get("email") as string,
      message: data.get("message") as string,
      company: data.get("company") as string,
    });
    setStep("confirm");
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-amber-50 flex flex-col items-center justify-center gap-6 px-8 md:px-16"
    >
      <h2 className="text-3xl">Contact</h2>

      {step === "form" && !state.success && (
        <form
          onSubmit={handleReview}
          className="relative flex flex-col gap-4 w-full max-w-md"
        >
          {/* honeypot: hidden from real users, bots tend to fill it anyway */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] w-px h-px overflow-hidden"
            aria-hidden="true"
          />
          <input
            type="text"
            name="name"
            placeholder="Lulu"
            required
            defaultValue={formValues.name}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="nekoneko@cat.com"
            required
            defaultValue={formValues.email}
            className="border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Hello meow🐾"
            required
            rows={5}
            defaultValue={formValues.message}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-amber-900 text-white p-2 rounded">
            Confirm🐾
          </button>
        </form>
      )}

      {step === "confirm" && !state.success && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <p>name: {formValues.name}</p>
          <p>address: {formValues.email}</p>
          <p>message: {formValues.message}</p>

          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="name" value={formValues.name} />
            <input type="hidden" name="email" value={formValues.email} />
            <input type="hidden" name="message" value={formValues.message} />
            <input type="hidden" name="company" value={formValues.company} />

            <button
              type="submit"
              disabled={isPending}
              className="bg-amber-900 text-white p-2 rounded"
            >
              {isPending ? "Sending..." : "Send!"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setStep("form")}
            className="border p-2 rounded"
          >
            Edit
          </button>

          {state.error && <p>Error: {state.error}</p>}
        </div>
      )}

      {state.success && (
        <div className="flex flex-col gap-4 max-w-md items-center">
          <p>Completed!</p>
          <p>Thank you! Awaiting Response🐾🐾</p>
        </div>
      )}
    </section>
  );
}
