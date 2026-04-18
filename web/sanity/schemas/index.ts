import blockContent from "./blockContent";
import post from "./post";
import author from "./author";
import category from "./category";
import event from "./event";
import speaker from "./speaker";
import ministry from "./ministry";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";

export const schemaTypes = [
  // Singletons (admin-only one-of-each)
  siteSettings,
  homePage,
  aboutPage,
  // Content collections
  post,
  author,
  category,
  event,
  speaker,
  ministry,
  blockContent,
];
