"use client";

import { login } from "@/app/actions";

export default function Page() {
  return (
    <form
      action={login}
      className="flex flex-col items-center gap-5 pt-30 text-gray-950"
    >
      <fieldset className="flex flex-col gap-3">
        <input
          required
          name="email"
          className="rounded-lg bg-gray-200 px-2 py-1"
          type="email"
          placeholder="example@email.com"
        />
        <input
          required
          name="password"
          type="password"
          className="rounded-lg bg-gray-200 px-2 py-1"
          placeholder="********"
        />
      </fieldset>
      <button className="rounded-lg bg-gray-300 px-3 py-1 text-gray-800 hover:cursor-pointer active:bg-gray-300/50">
        Login
      </button>
    </form>
  );
}
