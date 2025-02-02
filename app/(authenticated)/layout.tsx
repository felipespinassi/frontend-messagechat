"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/utils/fetcher";
import { MessageSquareText, Plus } from "lucide-react";
import useSWR from "swr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error, isLoading } = useSWR(
    "https://pingapp.com.br/conversation",
    fetcher
  );

  return (
    <main className="flex p-2 h-screen">
      {/* barra lateral  */}
      <aside className="border h-full bg-slate-200 w-10 py-2">
        <nav>
          <ul>
            <li className="flex justify-center">
              <a href="/chat">
                <MessageSquareText />
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* listagem  */}

      <div className="flex flex-col bg-slate-100  w-[400px]">
        {/* listagem de Conversas */}
        <div className="flex justify-between w-full p-4">
          <div>
            <h1 className="text-xl font-semibold">Conversas</h1>
          </div>
          <div className="cursor-pointer ">
            <Plus />
          </div>
        </div>
        {data?.map((conversation: any, index: number) => {
          const lastMessage = conversation.message.content.slice(0, 50);
          return (
            <div key={index}>
              <div className="p-4  cursor-pointer flex gap-4 hover:bg-slate-200">
                <div>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback> {conversation.user.name}</AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <p>{conversation.user.name}</p>
                  <small>{lastMessage}</small>
                </div>
              </div>
              <div className="border-b-2" />
            </div>
          );
        })}
      </div>

      {children}
    </main>
  );
}
