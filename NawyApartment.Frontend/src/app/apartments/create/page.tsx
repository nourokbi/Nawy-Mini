"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import CreateApartmentForm from "@/components/apartments/create/CreateApartmentForm";
import { isAuthenticated } from "@/lib/session";

const LOGIN_REDIRECT = `/login?redirect=${encodeURIComponent("/apartments/create")}`;

export default function CreateApartmentPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // When the page opens, check if the user is logged in. If not, send them to
  // login (remembering to come back here). If yes, show the form.
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(LOGIN_REDIRECT);
    } else {
      setReady(true);
    }
  }, [router]);

  // Render nothing until the auth check passes, so the form never flashes.
  if (!ready) return null;

  return (
    <Container>
      <main className="py-10">
        <CreateApartmentForm />
      </main>
    </Container>
  );
}
