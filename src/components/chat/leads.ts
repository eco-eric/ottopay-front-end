// Saves a chat follow-up request the same way the Contact page does: a row in the Supabase table
// contact_submissions (topic "chat") and a notification email through the send-email function.
import { supabase } from "@/integrations/supabase/client";
import { leadMessage, splitName, type ChatMessage, type Lead } from "./chatClient";

const NOTIFY = "eric@ecosourceIQ.com"; // same inbox as the Contact page form

export async function submitLead(lead: Lead, messages: ChatMessage[], page: string): Promise<void> {
  const { first, last } = splitName(lead.name);
  const email = lead.email.trim();
  const message = leadMessage(lead, messages, page);

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: first,
    last_name: last,
    email,
    topic: "chat",
    trade: null,
    message,
  });
  if (error) throw new Error("Sorry, that didn't go through. Please try again, or email support@ottopay.pro.");

  // The lead is saved either way; a failed email shouldn't make the visitor try again.
  await supabase.functions
    .invoke("send-email", {
      body: {
        to: NOTIFY,
        subject: `[Chat lead] ${lead.name.trim()}`,
        body: `New follow-up request from the website chat:\n\nName: ${lead.name.trim()}\nEmail: ${email}\n\n${message}`,
      },
    })
    .catch(() => undefined);
}
