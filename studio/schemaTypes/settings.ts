import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const settings = defineType({
  name: "settings",
  title: "Contact and settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "email",
      title: "Booking email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      description: "Shown on the Contact page, for example @filip.maczka.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactHeading",
      title: "Contact page heading",
      type: "string",
      initialValue: "Bookings and availability",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: "The short summary search engines and link previews show.",
      validation: (rule) => rule.required().max(160),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact and settings" }),
  },
});
