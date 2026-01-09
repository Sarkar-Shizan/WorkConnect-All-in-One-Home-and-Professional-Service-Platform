"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";

export default function Notifications() {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("bookings");

    channel.bind("booking-created", (data: any) => {
      alert(`New Booking: ${data.message}`);
    });

 
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return null;
}
