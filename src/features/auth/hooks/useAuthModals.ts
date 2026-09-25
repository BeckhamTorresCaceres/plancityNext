"use client";

import { useState } from "react";

export function useAuthModals() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return {
    isLoginOpen,
    isRegisterOpen,
    openLogin: () => setIsLoginOpen(true),
    closeLogin: () => setIsLoginOpen(false),
    openRegister: () => setIsRegisterOpen(true),
    closeRegister: () => setIsRegisterOpen(false),
  };
}
