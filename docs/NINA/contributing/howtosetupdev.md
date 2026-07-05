# 如何搭建开发环境

## 复刻仓库

1. 登录您的 GitHub 账号
2. 前往 [N.I.N.A. 的主仓库](https://github.com/isbeorn/nina)
3. 点击"Fork"
![复刻此仓库](../images/setup/Fork2.png)
4. 您将看到复刻的配置向导
5. 为您的复刻仓库输入名称
6. 简要描述您复刻此仓库的意图（可选）
7. 点击"Create fork"
8. 您将被引导至位于 `https://github.com/<your_username>/<your_fork's_name>/` 的新仓库

## 克隆仓库

1. 在复刻仓库的右上角点击"Clone"按钮
2. 弹出窗口将显示如何将此仓库克隆到本地计算机的命令
3. 打开命令窗口
4. 导航到您希望创建仓库文件夹的目录
5. 输入步骤 2 中显示的命令
```bash
git clone -n -b develop https://<YourUserName>@github.com/<YourUserName>/<YourForkName>.git
# 注意：-n 标志表示"不要检出分支"
# 暂时忽略任何 LFS smudge 错误。它们尚未同步，将在后续步骤中同步。
```
6. 导航到创建的文件夹
```bash
cd <YourForkName>
```
7. 接下来您需要添加上游仓库（您的复刻所基于的根仓库）。这在以后从主开发分支合并等操作时需要用到。
```bash
git remote add upstream https://github.com/isbeorn/nina.git
```
8. GitHub 不会自动将 LFS 复制到复刻仓库中。这需要手动操作。运行以下命令同步 LFS
```
git lfs fetch upstream --all
git lfs push origin --all
```
9. 现在我们需要检出 develop 分支
```
git checkout develop
```
10. 拉取外部依赖的子模块。这些包含所有不属于任何 NuGet 包的第三方 DLL，例如相机驱动、VCRedist 等。
```
git submodule update --init --recursive
```
## 保持您的仓库与上游根仓库同步

1. 打开命令行并导航到您的项目文件夹
2. 从上游仓库获取更改
```
git fetch upstream
```
3. 将上游 develop 分支的传入更改合并到您的 develop 分支
```
git merge upstream/develop
```
4. 如果遇到无法解决的合并冲突，您需要在您偏好的合并工具中解决它们