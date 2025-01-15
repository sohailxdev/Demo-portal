import { LogOut, CircleUserRound, KeyRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import ButtonSpinner from "@/components/ui/ButtonSpinner";
import { useAppDispatch } from "@/app/hooks";
import { useToast } from "@/hooks/use-toast";
import { cleanAuth } from "@/features/authSlice/authSlice";
import { cleanUser } from "@/features/CreateUser/UserSlice";

const formSchema = z
  .object({
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirm_password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function Profile() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch(cleanAuth());
    dispatch(cleanUser());
    toast({
      title: "Logout Successfully",
      className: "bg-green-500",
    });
    navigate("/login");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm_password: "",
      new_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(BASE_URL + "/change_password_api/", data);
      if (res.status === 200) {
        toast({
          title: "Password reset success",
        });
        setOpen(false);
      }
    } catch (error) {}
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="h-fit rounded-full p-2" variant="secondary">
              <CircleUserRound size={20} color="blue" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <div className="flex items-center hover:text-destructive transition-all w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password. Click change when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"grid items-start gap-4"}
            >
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Password :{" "}
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm new Password :{" "}
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <p className="me-1">Changing...</p>
                    <ButtonSpinner />
                  </>
                ) : (
                  "Change"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
