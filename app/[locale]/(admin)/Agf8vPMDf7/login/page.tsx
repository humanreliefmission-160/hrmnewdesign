import { redirect } from "next/navigation";
import { isAuthenticated } from "../auth-actions";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // If already authenticated, skip the login page
  if (await isAuthenticated()) {
    redirect(`/${locale}/Agf8vPMDf7/donations`);
  }

  return <LoginForm locale={locale} />;
}
