import type { ContactRequestPayload } from "~/types/api";
import { apiFetch } from "./client";

export function submitContactRequest(payload: ContactRequestPayload): Promise<{ detail: string }> {
  return apiFetch<{ detail: string }>("/api/v1/contact-requests/", {
    method: "POST",
    body: payload,
  });
}
