import { auth } from "@/lib/auth";

export default async function PrivatePage() {
  const session = await auth();

  console.log(session);
  return (
    <div>
      <h1>Rota Privadas: {session?.user?.name}</h1>
    </div>
  );
}
