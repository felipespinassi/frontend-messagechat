"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { socket } from "@/context/webSocketContext";
import { fetcher } from "@/utils/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

export default function ChatId({ conversationSelected, user }: any) {
  const [messages, setMessages] = useState<any>([]);
  const roomRef = useRef(`room-${conversationSelected?.id}`);
  const conversationIdRef = useRef("");
  const responseRef: any = useRef({});

  const chatRef: any = useRef(null);

  const { data, error, isLoading } = useSWR(
    `https://pingapp.com.br/conversation/user/${conversationSelected?.user.id}`,
    fetcher
  );

  async function getMessages() {
    const responseMessages = {
      conversation_id: data && data.id,
      messages: data && data.messages,
    };

    conversationIdRef.current = responseMessages.conversation_id;
    setMessages(data?.messages);

    responseRef.current.id = data && data.id;
  }

  useEffect(() => {
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [data]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit("joinRoom", roomRef.current);

    socket.on("joinedRoom", (room) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("leftRoom", (room) => {
      console.log(`Left room: ${room}`);
    });

    socket.on("onMessage", (data) => {
      setMessages((prev: any) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", roomRef.current);
      socket.off("joinedRoom");
      socket.off("leftRoom");
      socket.off("onMessage");
    };
  }, [roomRef.current]);

  const formSchema = z.object({
    value: z.string().min(2),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (messages.length === 0) {
      const response = await fetcher(
        `${process.env.EXPO_PUBLIC_BASE_URL}conversation`,
        {
          method: "POST",
          body: JSON.stringify({
            isGroup: false,
            users: [user.id, Number(conversationSelected.userId)],
          }),
        }
      );

      responseRef.current = response;
      socket.emit("newMessage", {
        room: roomRef.current,
        content: values.value,
        conversationId: responseRef.current.id,
        userId: user.id,
        type: "text",
      });
    } else {
      socket.emit("newMessage", {
        room: roomRef.current,
        content: values.value,
        conversationId: conversationIdRef.current,
        userId: user.id,
        type: "text",
      });
    }

    form.reset();
  }
  return (
    <div className="flex flex-col  w-[75%] ">
      <div className="  p-4">{conversationSelected?.user.name}</div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <div
          ref={chatRef}
          className="gap-4 flex flex-col bg-slate-100 overflow-y-auto h-full pb-8"
        >
          {messages?.map((message: any, index: any) => {
            if (message.userId == user.id) {
              return (
                <div key={index} className="mx-2 flex flex-col   items-end">
                  <p>Você</p>
                  <p
                    className={` p-2  rounded-md bg-primary max-w-[70%] text-white color-white font-semibold  `}
                  >
                    {message.content}
                  </p>
                </div>
              );
            }
            return (
              <div key={index} className="mx-2 flex justify-start  ">
                <p>{message?.sender}</p>
                <p className=" p-2  rounded-md bg-white max-w-[70%]   font-semibold">
                  {message.content}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="p-2 flex items-center gap-4">
        <Plus />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-2  w-full"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormControl>
                    <Input
                      className="w-full bg-white r"
                      placeholder="Digite uma mensagem"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">
              <Send />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
