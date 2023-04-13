const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const version = package.version;
const filePath = path.resolve(__dirname, '../miniprogram/pages/mine/index.wxml');

function main() {
  console.log('');
  console.log('--- 程序开始 ---');
  console.log(`:: 开始读入文件 ${filePath}`);
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  console.log(`:: 当前版本 ${version}`);
  const newContent = content.replace(/版本(.)+\<\/view\>/, `版本 ${version}</view>`);
  console.log(`:: 开始写入文件`);
  fs.writeFileSync(filePath, newContent, { encoding: 'utf-8' });
  console.log(`:: 版本写入完成`);
  console.log('--- 程序结束 ---');
}

main();
