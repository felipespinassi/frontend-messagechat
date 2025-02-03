import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";

export default function ChatId({ conversationSelected }: any) {
  const { data, error, isLoading } = useSWR(
    `https://pingapp.com.br/conversation/user/${conversationSelected?.user.id}`,
    fetcher
  );

  return (
    <div className="flex flex-col bg-slate-200 w-[70%] ">
      <div className=" bg-slate-100 p-4">{conversationSelected?.user.name}</div>

      <div className="p-2  h-full   items-start max-w-[75%] gap-2  flex flex-col">
        {data?.messages.map((message: any, index: number) => {
          return (
            <p key={index} className="bg-white p-2 rounded-md  ">
              {message?.content}
            </p>
          );
        })}
      </div>
    </div>
  );
}
