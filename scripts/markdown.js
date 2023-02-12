const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const MarkdownIt = require('markdown-it');

const markdown = new MarkdownIt();

const MODE = {
  HTML: 'html',
  WXHL: 'wxml'
};

const CSS_PATH = path.resolve(__dirname, './index.css');
const CHANGELOG_PATH = path.resolve(__dirname, '../CHANGELOG.md');
const MD_HTML_PATH = path.resolve(__dirname, './md-html.html');
const MD_WXML_HTML_PATH = path.resolve(__dirname, './md-wxml.html');

const WX_WXML_PATH = path.resolve(__dirname, '../miniprogram/pages_about/version/index.wxml');
const WX_CSS_PATH = path.resolve(__dirname, '../miniprogram/pages_about/version/index.scss');

function getBlockTag(mode) {
  return mode === MODE.WXHL ? 'view' : 'div';
}

function getInlineTag(mode) {
  return mode === MODE.WXHL ? 'text' : 'span';
}

function readAsHtml(markPath) {
  const mdContent = fs.readFileSync(markPath, { encoding: 'utf-8' });
  return markdown.render(mdContent);
}

function removeUnuseHtml(html = '', mode) {
  const INLINE_TAG = getInlineTag(mode);
  const idx = html.indexOf('<h2>0.0.5');
  return html
    .slice(0, idx)
    .replace(/<a(.+)>(.+)<\/a>/g, `<${INLINE_TAG} class="version">$2</${INLINE_TAG}>`) // 去a标签
    .replace(/<p>.+<\/p>/, '') // 去掉standard-version
    .split('\n')
    .map((str) => {
      // 去掉hash值
      if (/<li>.+[\u4E00-\u9FA5]+/.test(str)) {
        return `<li>${str.replace(/[^\u4e00-\u9fa5]/g, '')}</li>`;
      }
      return str;
    })
    .join('\n');
}

function tranformTag(html = '', mode) {
  const BLCK_TAG = getBlockTag(mode);
  const tags = ['h1', 'h2', 'h3', 'ul', 'li'].reduce((list, tag) => {
    return list.concat([
      [new RegExp(`<${tag}>`, 'g'), `<${BLCK_TAG} class="${tag}">`],
      [new RegExp(`<\/${tag}>`, 'g'), `</${BLCK_TAG}>`]
    ]);
  }, []);

  for (const [reg, str] of tags) {
    html = html.replace(reg, str);
  }
  return html;
}

function getCss(mode) {
  const css = fs.readFileSync(CSS_PATH, { encoding: 'utf-8' });
  return mode === MODE.HTML
    ? `<style>
  ${css}
  </style>`
    : css;
}

function formmatHtmlToWxml(html, mode) {
  html = removeUnuseHtml(html, mode);
  html = tranformTag(html, mode);
  const BLCK_TAG = getBlockTag(mode);
  return `<${BLCK_TAG} class="container">${html}</${BLCK_TAG}>`;
}

function writeFile(content, filePath) {
  console.log(`:: 开始写入文件 ${filePath}`);
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
  console.log(`:: 格式化文件`);
  shell.exec(`prettier --write ${filePath}`, { silent: false });
}

function main(mode) {
  console.log('--- 程序开始 ---');
  console.log(`- 0. 模式为 ${mode}`);
  const html = readAsHtml(CHANGELOG_PATH);
  console.log('- 1.解析html');
  const wxml = formmatHtmlToWxml(html, mode);
  console.log('- 2.转换成wxml');
  if (mode === MODE.WXHL) {
    writeFile(wxml, WX_WXML_PATH);
    writeFile(getCss(mode), WX_CSS_PATH);
  } else {
    writeFile(html, MD_HTML_PATH);
    writeFile(getCss(mode) + wxml, MD_WXML_HTML_PATH);
  }
  console.log('--- 程序结束 ---');
}

main(MODE.WXHL);
