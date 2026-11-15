#!/usr/bin/env node

import module from "node:module";
import process from "node:process";

if (typeof module.enableCompileCache === "function") {
  module.enableCompileCache();
}

const { program } = await import("commander");
program
  .name("termhat")
  .version("1.0.0")
  .description("Turn natural-language requests into safe terminal commands.")
  .argument("[task...]", "Describe the task you want to run")
  .option("-r, --run", "Skip menus and jump straight to confirmation")
  .option("-c, --copy", "Copy the generated command to clipboard")
  .option("-m, --model", "Change model")
  .action(async (taskArr, option) => {
    if (option.model) {
      const { changeModel } = await import("./util/config.js"); 
      await changeModel();
      return;
    }

    if (taskArr.length === 0) {
      const { default: showBanner } = await import("./ui/banner.js");
      await showBanner();
      return;
    }
    const taskSentence = taskArr.join(" ");
    const { default: executer } = await import("./core/executer.js");
    await executer(taskSentence, option);
    process.exit(0);
  });

await program.parseAsync(process.argv);
