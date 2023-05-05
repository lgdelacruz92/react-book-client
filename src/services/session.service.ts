import { getSessionKey } from "@/lib/firebase";

export const getSession = (): { uid: string } => {
  const session = JSON.parse(
    window.sessionStorage.getItem(getSessionKey()) || "{}"
  );

  return { uid: session.uid };
};
