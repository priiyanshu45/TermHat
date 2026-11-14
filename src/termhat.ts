#!/usr/bin/env node
//@ts-ignore
import process from "node:process";
import { program } from "commander";

program
  .name("termhat")
  .version("1.0.0")
  .description("Turn natural-language requests into safe terminal commands.")
  .argument("[task...]", "Describe the task you want to run")
  .option("-r, --run", "Skip menus and run the command directly")
  .option("-c, --copy", "Copy the generated command to clipboard")
  .action(async (taskArr, option) => {
    if (taskArr.length === 0) {
      const { default: showBanner } = await import("./ui/banner.js");
      await showBanner();
      return;
    }
    const taskSentence = taskArr.join(" ");
    const {default: executer} = await import("./core/executer.js")
    await executer(taskSentence, option);
    process.exit(0);
  });

await program.parseAsync(process.argv);
