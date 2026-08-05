"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/917012136060?text=Hello%20Ostrax%20Institute!%20I%20need%20some%20assistance."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Chat with Ostrax on WhatsApp"
    >
      <MessageCircle size={28} className="text-white fill-white" />
    </Link>
  );
}