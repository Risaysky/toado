import { useActionState, useState } from "react";
import { login, signup } from "../actions";

type authFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: authFormProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [state, formAction, isPending] = useActionState(
    type === "login" ? login : signup,
    null,
  );

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-5 pt-30 text-gray-950"
    >
      <fieldset className="flex flex-col gap-3">
        <input
          required
          name="email"
          className="rounded-lg bg-gray-200 px-2 py-1"
          type="email"
          placeholder="example@email.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          required
          name="password"
          type="password"
          className="rounded-lg bg-gray-200 px-2 py-1"
          placeholder="********"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </fieldset>
      <button
        disabled={isPending}
        className="disabled:bg- rounded-lg bg-gray-300 px-3 py-1 text-gray-800 hover:cursor-pointer active:bg-gray-300/50 disabled:cursor-not-allowed disabled:bg-gray-300/50"
      >
        {type === "login" ? "Login" : "Signup"}
      </button>
      {state && (
        <span className="rounded-lg bg-pink-200 px-2 py-1 text-gray-700">
          {state.message}
        </span>
      )}
    </form>
  );
}
