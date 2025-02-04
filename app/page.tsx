"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex  h-screen items-center justify-between  ">
      <div className=" w-1/2 h-screen">imagem aqui</div>

      <div className="w-1/2 flex justify-center items-center bg-blue-200 flex-col h-screen">
        <div className="flex flex-col border bg-slate-50 px-4 py-10 rounded-md gap-10">
          <h1 className="text-4xl font-bold text-center text-primary">Login</h1>

          <div className="flex flex-col items-center justify-center w-96 gap-8 ">
            <Input placeholder="E-mail" />
            <Input placeholder="Senha" />
            <Button onClick={() => router.push("/chat")}>Entrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
