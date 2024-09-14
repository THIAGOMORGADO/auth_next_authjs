import { useSession } from "@/hooks/useSession";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Privatelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useSession();
  if (!session) {
    redirect("/login");
  }
  return <div>{children}</div>;
}
