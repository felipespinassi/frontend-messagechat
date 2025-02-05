import { getUserFromCookie } from "@/utils/getUserFromCookie";
import ChatView from "@/views/Chat/Chat";

export default async function Chat() {
  const user = await getUserFromCookie();
  return <ChatView user={user} />;
}
