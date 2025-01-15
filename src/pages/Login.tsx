import Logo from "@/assets/logo.png";
import LoginBanner from "@/assets/login.gif";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { ApplicationName, BASE_URL } from "@/lib/constants";
import ButtonSpinner from "@/components/ui/ButtonSpinner";
import { LogInData, LogInError } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastAction } from "@/components/ui/toast";
import { useAppDispatch } from "@/app/hooks";
import { getFlattenedIdFromSideBar } from "@/lib/utils";
import { useEffect } from "react";
import { setRole } from "@/features/authSlice";

const inputSchema = z.object({
  password: z.string().trim().min(1, { message: "Required" }),
  username: z.string().email(),
});

const Login = () => {
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof inputSchema>> = async (data) => {
    try {
      const credentials: Record<string, { password: string; role: string }> = {
        "admin@gmail.com": { password: "admin", role: "admin" },
        "md1@gmail.com": { password: "md1", role: "master" },
        "eu1@gmail.com": { password: "eu1", role: "user" },
      };

      if (data) {
        const user = credentials[data.username];
        if (user && user.password === data.password) {
          dispatch(setRole(user.role));
          navigate("/");
        } else {
          throw new Error("Invalid username or password");
        }
      }
    } catch (error) {
      console.error((error as Error).message);
      alert((error as Error).message);
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="hidden bg-muted lg:block">
          <img
            src={LoginBanner}
            alt="Image"
            className="h-screen w-screen object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center px-5  mt-16 lg:mt-0">
          <div className="w-full max-w-xl mx-auto grid gap-6">
            <div className="flex flex-col items-center gap-4">
              <img src={Logo} alt="" className="w-10" />
              <h1 className="text-2xl font-semibold">{ApplicationName}</h1>
              <p className="text-balance text-muted-foreground">
                Enter your Registered email below to login to your account
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <CardTitle className="font-semibold text-2xl">Login</CardTitle>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem>
                        <FormLabel>
                          Username <span className="text-red-700">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={
                              error && "focus-visible:ring-destructive"
                            }
                            placeholder="john@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>
                            Password <span className="text-red-700">*</span>
                          </FormLabel>
                          <Link
                            to="/forget-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            className={
                              error && "focus-visible:ring-destructive"
                            }
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {isSubmitting ? <ButtonSpinner /> : "Login"}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link to="/" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
