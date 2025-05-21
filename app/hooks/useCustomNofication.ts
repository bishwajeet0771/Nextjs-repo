import { useSession } from "next-auth/react";

export default function useCustomNofication() {
  const { data: session } = useSession();
  return session;
}
