import { exec } from "child_process";

const controller = typeof AbortController !== "undefined" ? new AbortController() : { abort: () => {}, signal: new AbortSignal() };

const { signal } = controller ?? {};

exec("website_crawler", { signal }, (error, stdout, stderr) => {
  stdout && console.log(stdout);
  stderr && console.error(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});

process.on("SIGTERM", () => {
  controller && controller.abort();
});

process.on("SIGINT", () => {
  controller && controller.abort();
});
    