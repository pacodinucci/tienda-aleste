"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { montserrat, oswald } from "@/lib/fonts";
import Image from "next/image";
// import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isSignedIn) {
      const returnUrl = "/admin";
      router.push(returnUrl);
    }
  }, [isSignedIn, router, searchParams]);

  return (
    <div className="py-48 h-screen bg-bottles bg-cover relative">
      <div className="bg-black/40 absolute inset-0" />
      <div className="container flex items-center justify-center">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="relative isolate w-full space-y-8 rounded-2xl bg-blue-950/80 px-4 py-10 shadow-md ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
          >
            <header className="text-center flex justify-center items-center flex-col">
              <Image
                src="/logogaviotas.svg"
                alt="logo al este"
                width={100}
                height={50}
              />
              <h1
                className={`${montserrat.className} mt-4 text-xl font-medium tracking-tight text-white`}
              >
                Ingresar a Bodega Al Este
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-rose-400" />
            <Clerk.Field name="identifier" className="group/field relative">
              <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-sky-950 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-blue-300 group-data-[invalid]/field:text-rose-400">
                Email
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-blue-500/20 focus:ring-[1.5px] focus:ring-blue-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="group/field relative">
              <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-sky-950 px-2 font-mono text-xs/4 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-blue-300 group-data-[invalid]/field:text-rose-400">
                Contraseña
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-blue-500/20 focus:ring-[1.5px] focus:ring-blue-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="relative isolate w-full rounded-lg bg-gradient-to-b from-sky-800 to-sky-950 px-3.5 py-2.5 text-center text-sm text-white font-medium shadow-[0_1px_0_0_theme(colors.white/30%)_inset,0_-1px_1px_0_theme(colors.black/5%)_inset] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:text-emerald-950/80 active:before:bg-black/10"
            >
              Ingresar
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
