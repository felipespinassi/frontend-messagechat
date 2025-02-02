import { MessageSquareText, Plus } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex p-2 h-screen">
      {/* barra lateral  */}
      <aside className="border h-full bg-slate-100 w-10">
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

      <div className="flex flex-col bg-slate-200 w-[400px]">
        {/* listagem de Conversas */}
        <div className="flex justify-between w-full p-4">
          <div>
            <h1 className="text-xl font-semibold">Conversas</h1>
          </div>
          <div className="cursor-pointer ">
            <Plus />
          </div>
        </div>
      </div>

      {children}
    </main>
  );
}
