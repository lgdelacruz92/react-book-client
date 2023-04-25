import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { ComponentWithAs } from "@chakra-ui/react";
import { iFrameRenderPlugin } from "./plugins/iframe-render.plugin";

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
});
md.use(iFrameRenderPlugin);

interface MarkdownProps {
  content: string;
}

const MarkdownBase: ForwardRefRenderFunction<HTMLDivElement, MarkdownProps> = (
  { content }: MarkdownProps,
  ref
) => {
  const html = md.render(content);

  return (
    <div
      ref={ref}
      className="markdown-it-output"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default forwardRef(MarkdownBase) as ComponentWithAs<
  "div",
  MarkdownProps
>;
