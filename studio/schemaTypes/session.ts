import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ImagesIcon } from "@sanity/icons/Images";
import { BatchImageUpload } from "../components/BatchImageUpload";

export const session = defineType({
  name: "session",
  title: "Session",
  type: "document",
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "session" }),
    defineField({
      name: "model",
      title: "Model name",
      type: "string",
      description: "Shown under the photo on the Work page and on the session page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      description: "The end of the session's web address, for example anna-kuta.",
      options: { source: "model", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Drag photos to change their order. The first portrait photo is used as the cover on the Work page.",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      options: { layout: "grid" },
      components: { input: BatchImageUpload },
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "model", media: "images.0", images: "images" },
    prepare({ title, media, images }) {
      const count = Array.isArray(images) ? images.length : 0;
      return { title, media, subtitle: `${count} ${count === 1 ? "photo" : "photos"}` };
    },
  },
});
