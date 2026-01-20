"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
import toast, { Toaster } from "react-hot-toast";

type Notification = {
  message: string;
  bookingId?: number;
  type: "booking-created" | "booking-cancelled" | "profile-updated";
};

export default function Notifications() {
  //pusher connection
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Customer updates
    const customerChannel = pusher.subscribe("customers");
    customerChannel.bind("profile-updated", (data: Notification) => {
      toast(data.message, {
        style: { background: "#1f9607", color: "#ffffff" },
        duration: 5000,
      });
    });

    // Booking updates
    const bookingChannel = pusher.subscribe("bookings");

    bookingChannel.bind("booking-created", (data: Notification) => {
      toast(data.message, {
        style: { background: "#d1fae5", color: "#065f46" },
        duration: 5000,
      });
    });

    bookingChannel.bind("booking-cancelled", (data: Notification) => {
      toast(data.message, {
        style: { background: "#fce7f3", color: "#9d174d" },
        duration: 5000,
      });
    });

    return () => {
      customerChannel.unbind_all();
      customerChannel.unsubscribe();
      bookingChannel.unbind_all();
      bookingChannel.unsubscribe();
    };
  }, []);

  return <Toaster position="top-right" reverseOrder={false} />;
}
