"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log(values);
      // sign up with Appwrite and get plaid token
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      }

      if (type === "sign-in") {
        await signIn(values)
          .then((res) => {
            setUser(res);
            router.push("/");
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
          <Image src={"/icons/logo.svg"} alt="logo" width={32} height={32} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Banking App
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link account" : type === "sign-in" ? "Sign in" : "Sign up"}
          </h1>
          <p className="text-16 text-gray-600 font-normal">
            {user
              ? "Link your account to continue"
              : type === "sign-in"
              ? "Welcome back! Please sign in to continue"
              : "Create an account to get started"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4 ">{/* TODO: PLAID LINK */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex: CA"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 12345"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="ex: 123-45-6789"
                    />
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button type="submit" disabled={isLoading} className="form-btn">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="ml-2">Loading</span>
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-16 text-gray-600 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              <span className="text-16 text-blue-600 font-semibold hover:underline">
                {type === "sign-in" ? "Sign up" : "Sign in"}
              </span>
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
