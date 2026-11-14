import { getConfig } from "../util/config.js";
import { buildUserPrompt } from "../util/context.js";
import pc from "picocolors";

export default async function responseByAI(task: string) {
  const userRequest = buildUserPrompt(task);
  const ai = getConfig().provider;
  if (!ai) {
    console.log( pc.red("No AI provider configured. Run `th` to set one up first."));
    return null;
  }

  switch (ai) {
    case "gemini":
      const { askGemini } = await import("./gemini.js");
      return await askGemini(userRequest);

    default:
      console.log(pc.red(`Unsupported AI Provider: ${ai}`));
      return null;
  }
}
