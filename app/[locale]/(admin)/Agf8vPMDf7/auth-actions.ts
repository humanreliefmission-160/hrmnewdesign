"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Read from environment — never exported as constants (not allowed in "use server" files)
function sessionCookie() {
  return process.env.DONATIONS_SESSION_COOKIE ?? "hrm_donations_auth";
}
function sessionValue() {
  return process.env.DONATIONS_SESSION_VALUE ?? "hrm_sess_d9xK2mPqL7";
}

const VALID_EMAIL = "donations@humanreliefmission.com";
const VALID_PASSWORD = "V1deB&5s5$c)";

/** Validate credentials and set the session cookie. Returns an error string or null on success. */
export async function loginAction(
  email: string,
  password: string
): Promise<{ error?: string }> {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(sessionCookie(), sessionValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return {};
  }
  return { error: "Invalid email or password." };
}

/** Clear the session cookie and redirect to the login page. */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie());
  redirect("/en/Agf8vPMDf7/login");
}

/** Server-side helper: returns true if the session cookie is valid. */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(sessionCookie())?.value === sessionValue();
}
