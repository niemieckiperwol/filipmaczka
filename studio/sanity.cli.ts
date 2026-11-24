import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "na73b8di",
    dataset: "production",
  },
  studioHost: "filipmaczka",
  deployment: {
    appId: "svm2fwzrv5dnnknxx5tfalai",
    autoUpdates: true,
  },
});
