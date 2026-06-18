import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const VoiceCtx = createContext<Ctx>({ open: false, setOpen: () => {} });

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <VoiceCtx.Provider value={{ open, setOpen }}>{children}</VoiceCtx.Provider>;
}

export const useVoice = () => useContext(VoiceCtx);