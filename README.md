# 🌌 广外译星者 · 天文台指南

欢迎来到**译星者天文协会**的知识基地！

这里是我们一起学天文、用天文的地方——从仰望星空的第一课，到亲手操作望远镜拍下第一张深空照片。

## ✨ 零基础？完全没问题

我们社的大多数人在入社之前都没接触过天文观测——不知道赤道仪怎么转、看不懂星图、甚至连北极星在哪都不确定。这太正常了。

这个手册就是为此而写的。**每一篇文章都假设你是第一次听说这些概念**，从最基础的东西开始，一步一步来。

## 📚 内容板块

| 板块 | 内容 |
|:-----|:-----|
| 🧭 基础理论 | 天球坐标系、时间与历法、星等与光谱……天文观测必备的理论基础 |
| 🔭 设备手册 | 学校天文台的每一台设备怎么用——从赤道仪到 CCD 相机 |
| 🌙 观测指南 | 今晚能看什么？怎么找？怎么记录？ |
| 🚀 实践项目 | 月球环形山测绘、梅西耶马拉松、行星冲日观测……动手才是硬道理 |

## 🚧 刚刚起步

这个网站还处于**早期建设阶段**，很多内容还在路上。你看到的每一个页面都是社员们一点一点写出来的。

**如果你发现错误、有更好的解释方式、或者有想写的选题**——欢迎参与！

## ✨ 如何参与编辑

我们推荐使用电脑进行编辑，手机或平板也可以，只是体验会差一些。进行任何编辑前你应该先[登录 GitHub 账户](https://github.com/login)，如果没有，可以[点击这里](https://github.com/signup)注册。

如果你熟悉 Git，推荐 Fork 本仓库后在本地编辑，完成后向 `master` 分支提交 Pull Request，社团人员会审核你的修改。

### 📝 关于写作格式

所有文档都使用 [Markdown](https://markdown.com.cn/intro.html) 格式编写。如果你之前没用过 Markdown，请读一下入门教程，Markdown 格式十分简单，不会耽误你很多时间。

本项目还支持一些 Docusaurus 特有的扩展语法：

- **提示框**：用 `:::note`、`:::tip`、`:::info`、`:::warning`、`:::danger` 可以创建不同样式的提示框，详见 [告示文档](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)
- **数学公式**：用 `$...$` 写行内公式（如 $E = mc^2$），用 `$$...$$` 写独立公式块，可以使用LaTeX语法。你可以查看[KaTeX文档](https://katex.org/docs/supported)或[KaTex语法笔记 | 礁石图书馆](https://industrimatic.github.io/2026/01/30/学习笔记/Katex语法笔记/index.html)来学习
- **Mermaid 图表**：可以直接在文档中画流程图、时序图等，详见 [Mermaid 文档](https://docusaurus.io/zh-CN/docs/markdown-features/diagrams)
- [更多参考](https://docusaurus.io/zh-CN/docs)

不用太担心写错——提交后社团审核时会帮你修正格式问题。

### 编辑已有页面

1. **找到你想改的页面**
   在[网站](https://manual.novas.top)上打开目标页面，点击页面底部左下角的 **「编辑此页」**，会跳转到 GitHub 的在线编辑器。
   
2. **在线编辑**
   在 GitHub 编辑器中使用 Markdown 语法修改内容——编辑器左上角有 **Preview** 按钮可以实时预览，不需要安装任何软件。

3. **提交修改**
   
   - 点击右上角的 **Commit changes** 按钮，然后填写以下栏目：
     - **Commit message**（必填）：写一句话概括你改了什么，例如「修正赤道仪对极轴步骤的描述」
     - **Extended description**（可选）：补充更多细节、署名、或说明编辑的理由等
   - 点击 **Propose changes**
   - 跳转后点击 **Create pull request**
   
4. **等待审核**
   社团人员会审核你的提交，通过后你的修改就会出现在网站上，你的名字也会出现在贡献者名单里 📝

### 新建文档

1. 如果你想写一篇全新的文档，可以点击下面的链接创建文件：

   [新建理论文档](https://github.com/TAHAamaBOT/gzfls-observatory-manual/new/master/docs/theory)

   [新建设备文档](https://github.com/TAHAamaBOT/gzfls-observatory-manual/new/master/docs/equipment)

2. 打开链接后，在编辑器上方的`Name your file...`中填写文件名（例如 `行星冲日观测.md`），用 [Markdown](https://markdown.com.cn/intro.html) 写好内容

3. **提交修改**
   
   - 点击右上角的 **Commit changes** 按钮，然后填写以下栏目：
     - **Commit message**（必填）：写一句话概括你改了什么，例如「新增行星冲日观测指南」
     - **Extended description**（可选）：补充更多细节、署名、或说明编辑的理由等
   - 点击 **Propose changes**
   - 跳转后点击 **Create pull request**

4. **等待审核**
   社团人员会审核你的提交，通过后你的修改就会出现在网站上，你的名字也会出现在贡献者名单里 📝

---

## 技术栈

网站使用 [Docusaurus](https://docusaurus.io/) 构建，基于 React 和 MDX。

## 本地开发

```bash
# 安装依赖（需要 Node.js 20+）
npm install

# 启动开发服务器
npm run start
```

启动后浏览器自动打开 `http://localhost:3000`，大部分修改会实时热更新。

## 构建

```bash
npm run build
```

生成静态文件到 `./build` 目录，可部署到任意静态托管服务。

## 提交规范

本项目要求所有 commit 遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范。

### 格式

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

### 类型

| 类型 | 说明 |
|:-----|:-----|
| `feat` | 新增功能（对应 SemVer `MINOR`） |
| `fix` | 修复 bug（对应 SemVer `PATCH`） |
| `build` | 修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等 |
| `chore` | 对非业务性代码进行修改，例如修改构建流程或者工具配置等 |
| `ci` | 修改持续集成流程，例如修改 CI/CD 工作流配置等 |
| `docs` | 修改文档，例如修改 README 文件、API 文档等 |
| `style` | 修改代码样式，例如调整缩进、空格、空行等 |
| `refactor` | 重构代码，例如修改代码结构、变量名、函数名等但不修改功能逻辑 |
| `perf` | 优化性能，例如提升代码的性能、减少内存占用等 |
| `test` | 修改测试用例，例如添加、删除、修改代码的测试用例等 |
| `revert` | 回滚之前的提交 |

破坏性变更在类型/范围后加 `!`，或在脚注中标注 `BREAKING CHANGE:`。

### 示例

```bash
git commit -m "docs: 修正对极轴步骤的描述"
git commit -m "feat(equipment): 新增行星冲日观测指南"
git commit -m "fix: 修正梅西耶星表图片链接"
git commit -m "feat!: 重构 API 接口

BREAKING CHANGE: 原有 /v1/ 端点已升级为 /v2/"
```

### 自动检查

项目配置了 [commitlint](https://commitlint.js.org/) + [Husky](https://typicode.github.io/husky/)，`git commit` 时自动校验消息格式。格式错误会提示原因并拒绝提交。

协作者执行 `npm install` 后自动生效，无需额外配置。

## 部署

使用 GitHub Pages：

```bash
GIT_USER=<你的 GitHub 用户名> npm run deploy
```

使用 SSH：

```bash
USE_SSH=true npm run deploy
```

此命令会自动构建并推送到 `gh-pages` 分支。

---

## 许可证

本项目采用多许可证结构，详见 [NOTICE](NOTICE) 文件：

| 部分 | 许可证 |
|:-----|:-------|
| 源代码（`src/`、配置文件等） | [GNU GPLv3](LICENSE) |
| N.I.N.A. 文档（`docs/NINA/`） | [MPL-2.0](docs/NINA/LICENSE) |
| 原创文档与内容（`docs/theory/`、`docs/equipment/`、`blog/` 等其他原创 .md 文件） | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) |
