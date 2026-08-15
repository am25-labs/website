import { createPlankClient } from "@plank-cms/client";

const plank = createPlankClient({
  url: process.env.PLANK_URL!,
  token: process.env.PLANK_TOKEN!,
  defaultLocale: "es",
});

export default plank;
