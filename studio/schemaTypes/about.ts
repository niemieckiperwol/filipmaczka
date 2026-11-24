import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "The large word at the top of the page.",
      initialValue: "About",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      description: "Each paragraph starts with an indent. Select text to add a link.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "Address",
                    type: "url",
                    description: "A web address, or mailto: followed by an email address.",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description",
          type: "string",
          description: "Describes the photo for people using screen readers.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About" }),
  },
});
