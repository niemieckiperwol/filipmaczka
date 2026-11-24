import { about } from "./about";
import { session } from "./session";
import { settings } from "./settings";

export const schemaTypes = [session, about, settings];

export const singletonTypes = new Set(["about", "settings"]);
