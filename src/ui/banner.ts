//@ts-ignore
import process from "node:process";
import pc from "picocolors";

const DEFAULT_BANNER = String.raw`
  ______  _____  ____   __  __  _   _     _   _____ 
 |_   _|| ____||  _ \ |  \/  || | | |   / \ |_   _|
   | |  |  _|  | |_) || |\/| || |_| |  / _ \  | |  
   | |  | |___ |  _ < | |  | ||  _  | / ___ \ | |  
   |_|  |_____||_| \_\|_|  |_||_| |_|/_/   \_\|_|  `;

export default async function showBanner() {
  const terminalWidth = Number(process.stdout.columns || process.env.COLUMNS || 85);

  let banner = DEFAULT_BANNER;

  if (terminalWidth < 55) {
    const { default: figlet } = await import("figlet");
    banner = figlet.textSync("TERMHAT", {
      font: "Standard",
      horizontalLayout: "fitted",
      width: terminalWidth,
    });
  }

  console.log(pc.bold(pc.blueBright(banner)));
  console.log(pc.italic(pc.underline(pc.inverse("Stop memorizing commands. Start describing tasks.\n"))));

  const { default: home } = await import("./home.js");
  await home();
}
