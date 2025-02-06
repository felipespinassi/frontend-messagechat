"use client";

import { socket, WebSocketContext } from "@/context/webSocketContext";
import { MessageSquareText, Plus } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WebSocketContext.Provider value={socket}>
      <main className="flex  h-screen ">{children}</main>
    </WebSocketContext.Provider>
  );
}
