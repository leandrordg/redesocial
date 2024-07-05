import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[SVIX WEBHOOK] Error verifying webhook:", err);
    return new Response("[SVIX WEBHOOK] Error occured", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created": {
      await prisma.user.create({
        data: {
          userId: id as string,
          firstName: evt.data.first_name as string,
          lastName: evt.data.last_name as string,
          // check the primary email id to find
          email: evt.data.email_addresses.find(
            (email) => email.id === evt.data.primary_email_address_id
          )?.email_address as string,
          imageUrl: evt.data.image_url as string,
          username: evt.data.username as string,
          phone: evt.data.primary_phone_number_id
            ? (evt.data.phone_numbers.find(
                (phone) => phone.id === evt.data.primary_phone_number_id
              )?.phone_number as string)
            : null,
        },
      });
      break;
    }
    case "user.updated": {
      await prisma.user.update({
        where: {
          userId: id as string,
        },
        data: {
          firstName: evt.data.first_name as string,
          lastName: evt.data.last_name as string,
          // check the primary email id to find
          email: evt.data.email_addresses.find(
            (email) => email.id === evt.data.primary_email_address_id
          )?.email_address as string,
          imageUrl: evt.data.image_url as string,
          username: evt.data.username as string,
          phone: evt.data.primary_phone_number_id
            ? (evt.data.phone_numbers.find(
                (phone) => phone.id === evt.data.primary_phone_number_id
              )?.phone_number as string)
            : null,
        },
      });
      break;
    }
    case "user.deleted": {
      await prisma.user.delete({
        where: {
          userId: id as string,
        },
      });
      break;
    }
    default: {
      console.log(`Unhandled event type: ${eventType}`);
      break;
    }
  }

  return new Response("[SVIX WEBHOOK] Webhook registered successfully!", {
    status: 200,
  });
}
