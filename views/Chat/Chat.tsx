"use client";

import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import ChatId from "./components/ChatId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle, Plus } from "lucide-react";

export default function Chat({ user }: any) {
  const { data, error, isLoading } = useSWR(
    "https://pingapp.com.br/conversation",
    fetcher
  );

  const [conversationSelected, setConversationSelected] = useState<any>(null);
  return (
    <div className="flex w-screen ">
      <div className="flex flex-col border-r   w-[25%]">
        {/* listagem de Conversas */}
        <div className="flex justify-between  w-full p-3">
          <div>
            <h1 className="text-xl font-semibold">Conversas</h1>
          </div>
          <div className="cursor-pointer ">
            <Plus />
          </div>
        </div>

        {!isLoading ? (
          <div className=" h-full m-2">
            {data?.map((conversation: any, index: number) => {
              console.log(conversation.id === conversationSelected?.id);
              const lastMessage = conversation?.message.content.slice(0, 50);
              return (
                <div
                  key={index}
                  onClick={() => setConversationSelected(conversation)}
                >
                  <div
                    className={`p-4  rounded-md  cursor-pointer flex gap-4  ${
                      conversation.id === conversationSelected?.id
                        ? "bg-primary text-white"
                        : "hover:bg-slate-100"
                    } `}
                  >
                    <div>
                      <Avatar>
                        <AvatarImage src="https://github.com/expedy-source.png" />
                        <AvatarFallback>
                          {conversation?.user.name}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div>
                      <p>{conversation?.user.name}</p>
                      <small>{lastMessage}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" h-full flex items-center justify-center">
            <LoaderCircle className=" animate-spin " />
          </div>
        )}
      </div>

      {conversationSelected ? (
        <ChatId user={user} conversationSelected={conversationSelected} />
      ) : (
        <div className="flex flex-col bg-slate-200 w-[70%] ">
          <div className="flex items-center justify-center h-full">
            <p>Selecione uma conversa</p>
          </div>
        </div>
      )}
    </div>
  );
}
