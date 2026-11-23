"use client";

import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton({ copy }) {
  return (
    <a
      href={whatsappLink(copy.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsapp.floatingLabel}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.63.7 5.1 1.92 7.22L2 30l6.94-1.82A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2Zm0 25.4c-2.32 0-4.5-.68-6.35-1.86l-.46-.28-4.12 1.08 1.1-4-.3-.47A11.4 11.4 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4Zm6.24-8.34c-.34-.17-2-1-2.3-1.1-.31-.11-.54-.17-.76.17-.23.34-.87 1.1-1.07 1.32-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.68-1-.9-1.68-2-1.88-2.35-.2-.34-.02-.53.15-.7.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.76-1.83-1.04-2.5-.27-.65-.55-.56-.76-.57h-.65c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86 0 1.69 1.23 3.32 1.4 3.55.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2-.82 2.28-1.6.28-.79.28-1.47.2-1.6-.08-.14-.31-.23-.65-.4Z" />
      </svg>
    </a>
  );
}
