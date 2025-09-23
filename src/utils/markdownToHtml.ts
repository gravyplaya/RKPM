import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(
  markdownContent: string
): Promise<string> {
  if (!markdownContent) {
    return "";
  }

  try {
    const processedContent = await remark().use(html).process(markdownContent);

    return processedContent.toString();
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    return markdownContent; // Return original content if conversion fails
  }
}
