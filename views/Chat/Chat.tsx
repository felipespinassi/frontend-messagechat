"use client";

import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import ChatId from "./components/ChatId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export default function Chat() {
  const { data, error, isLoading } = useSWR(
    "https://pingapp.com.br/conversation",
    fetcher
  );
  const [conversationSelected, setConversationSelected] = useState(null);

  return (
    <div className="flex w-screen ">
      <div className="flex flex-col bg-slate-100  w-[30%]">
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
            <div
              key={index}
              onClick={() => setConversationSelected(conversation)}
            >
              <div className="p-4  cursor-pointer flex gap-4 hover:bg-slate-200">
                <div>
                  <Avatar>
                    <AvatarImage src="https://github.com/expedy-source.png" />
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

      {conversationSelected ? (
        <ChatId conversationSelected={conversationSelected} />
      ) : (
        <div className="flex flex-col bg-slate-200 w-[70%] " />
      )}
    </div>
  );
}
