import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: unknown) {
  if (!builder || !source) return null;
  return builder.image(source as Parameters<typeof builder.image>[0]);
}
