import Conf from "conf";
import type { configTypes } from "./types.js";

const conf = new Conf({ projectName: "termhat" });

export function configure(apiKey: string, provider: string, model: string) {
  conf.set("apiKey", apiKey);
  conf.set("provider", provider);
  conf.set("model", model);
}

export function getConfig() {
  const config = {
    apiKey: conf.get("apiKey"),
    provider: conf.get("provider"),
    model: conf.get("model"),
  };
  return config as configTypes;
}

export async function changeModel() {
  const ai = getConfig();
  const { default: pc } = await import("picocolors");
  if (!ai.model) return console.log(pc.yellow("Please set up your API key first."));
  console.log(pc.bold("Current Model: ") + pc.green(ai.model));
  const { text, isCancel } = await import("@clack/prompts");
  const newModel = await text({
    message: "Enter new model:",
    placeholder: "e.g. gemini-3.8-flash",
    validate: async (value) => {
      if (!value?.trim()) return "Please enter a model name.";
      return undefined;
    },
  });

  if (isCancel(newModel)) {
    console.log(pc.green("No changes made."));
    process.exit(0);
  }

  switch (ai.provider) {
    case "gemini":
      const { testConnection } = await import("../ai/gemini.js");
      if (await testConnection(ai.apiKey.trim(), (newModel as string).trim())) {
        conf.set("model", newModel);
        console.log(pc.cyan(`Done! Saved ${newModel as string} for ${ai.provider}.`));
        return;
      } else {
        console.log(pc.red("Connection failed. Please try again."));
        return null;
      }

    default:
      console.log(pc.red(`Unsupported AI provider: ${ai}`));
      return null;
  }
}
