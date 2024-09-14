import { auth } from "@/lib/auth";
import { getSession } from "next-auth/react";

export async function useSession() {
  let session;
  if(typeof window === "undefined") {
    session = await auth();

  } else {
    session = await getSession();
  }

  return session;
}