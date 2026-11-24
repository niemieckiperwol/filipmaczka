import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon } from "@sanity/icons/Cog";
import { ImagesIcon } from "@sanity/icons/Images";
import { UserIcon } from "@sanity/icons/User";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Website")
    .items([
      orderableDocumentListDeskItem({
        type: "session",
        title: "Sessions",
        icon: ImagesIcon,
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title("About")
        .icon(UserIcon)
        .child(S.document().schemaType("about").documentId("about").title("About")),
      S.listItem()
        .title("Contact and settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("settings").documentId("settings").title("Contact and settings"),
        ),
    ]);
