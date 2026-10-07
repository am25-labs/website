"use client";

import Turnstile from "react-turnstile";

interface TurnstileWrapProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  theme?: "light" | "dark" | "auto";
}

export default function TurnstileWrap({
  onVerify,
  onExpire,
  theme = "dark",
}: TurnstileWrapProps) {
  return (
    <div className="w-full">
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        size="flexible"
        fixedSize
        theme={theme}
        language="en"
        className="w-full"
        onVerify={onVerify}
        onExpire={onExpire}
      />
    </div>
  );
}
