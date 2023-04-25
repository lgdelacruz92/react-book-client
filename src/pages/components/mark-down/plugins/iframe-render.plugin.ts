import MarkdownIt, { PluginSimple } from "markdown-it";

export const iFrameRenderPlugin: PluginSimple = (md: MarkdownIt) => {
  const iframeRe = /^<iframe.*?<\/iframe>/;

  md.renderer.rules.html_block = (tokens, idx) => {
    const html = tokens[idx].content;
    const match = html.match(iframeRe);

    if (match) {
      const src = match[0].replace(/^<iframe.*src="/, "").replace(/".*$/, "");
      const iframeHtml = `<iframe src="${src}" frameborder="0" allowfullscreen></iframe>`;

      return iframeHtml;
    }

    return html;
  };
};
