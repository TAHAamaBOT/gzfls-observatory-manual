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

## ✨ 参与贡献

发现错误、有更好的想法、或者想写新内容？欢迎参与！详见 [参与贡献](CONTRIBUTING.md)。

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

本项目采用 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，详见 [CONTRIBUTING.md](CONTRIBUTING.md#提交规范)。

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
