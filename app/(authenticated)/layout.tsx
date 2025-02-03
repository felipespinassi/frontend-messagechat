import { MessageSquareText, Plus } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex p-2 h-screen bg-black ">
      <aside className="border h-full bg-slate-200 w-10 py-2 ">
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

      {children}
    </main>
  );
}
