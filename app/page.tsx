"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { setTokenOnCookies } from "@/utils/setTokenOnCookie";
import { setUserOnCookie } from "@/utils/setUserOnCookie";

export default function Home() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    "https://pingapp.com.br/auth",
    auth,
    {
      onSuccess: async (data) => {
        await Promise.all([
          setTokenOnCookies(data.access_token),
          setUserOnCookie(JSON.stringify(data.user)),
        ]);

        router.push("/chat");
      },
    }
  );

  async function auth(url: string, { arg }: { arg: any }) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    trigger(values);
  }
  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex  h-screen items-center justify-between  ">
      <div className=" w-1/2 h-screen">imagem aqui</div>

      <div className="w-1/2 flex justify-center items-center bg-blue-200 flex-col h-screen">
        <div className="flex flex-col border bg-slate-50 px-4 py-10 rounded-md gap-10">
          <h1 className="text-4xl font-bold text-center text-primary">Login</h1>

          <div className="flex flex-col items-center justify-center w-96 gap-8 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="E-Mail" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Senha" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isMutating} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
