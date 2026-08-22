"use client";

import Turnstile from "react-turnstile";

interface TurnstileWrapProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

export default function TurnstileWrap({
  onVerify,
  onExpire,
}: TurnstileWrapProps) {
  return (
    <div className="w-full">
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        size="flexible"
        fixedSize
        theme="dark"
        language="en"
        className="w-full"
        onVerify={onVerify}
        onExpire={onExpire}
      />
    </div>
  );
}
