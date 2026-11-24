import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { schemaTypes, singletonTypes } from "./schemaTypes";
import { structure } from "./structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "filipmaczka",
  title: "Filip Maczka",
  projectId: "na73b8di",
  dataset: "production",
  plugins: [structureTool({ structure }), media()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});
