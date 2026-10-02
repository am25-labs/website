declare module "*.css";
declare module "@/styles/globals.css";

interface Window {
  umami?: {
    track: (
      event: string,
      data?: Record<string, string | number | boolean | null>,
    ) => void;
  };
}
