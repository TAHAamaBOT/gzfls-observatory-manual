# N.I.N.A. 3.0 ASCOM 驱动问题排查指南

## 引言
随着 N.I.N.A. 在 3.0 版本中从 .NET Framework 4.8 升级到 .NET 8，部分 ASCOM 驱动可能不再正常工作。这些问题通常表现为缺少依赖项或与新运行时环境不兼容的错误提示。常见错误包括：

- "ASCOM.DriverException: Could not load file or assembly 'System.Runtime, Version=6.0.0.0 [...]"
- "System.TypeLoadException: Creating an instance of the COM component [...]"
- 驱动无法被多个应用程序同时使用
- 驱动仅提供 x86 版本

为解决这些问题，您可以使用 `ASCOM Device Hub` 或 `Optec ASCOM Server` 将有问题的驱动包装在独立的环境中。本指南概述了修复这些问题的步骤。

## 逐步修复

### **安装 ASCOM Platform**：

- 确保已安装最新版本的 ASCOM Platform。可从 [ASCOM Standards 网站](https://ascom-standards.org/)下载。

### 使用 ASCOM Device Hub

a. **选择 ASCOM Device Hub**：

- 打开 N.I.N.A.
- 导航到 `设备` 标签页
- 导航到对应设备的子标签页
- 选择 `Device Hub` 条目
- 如果该设备类型没有 Device Hub，则退而使用下文描述的 Optec ASCOM Server

b. **配置设备**：

- 点击齿轮图标打开驱动设置
- 在 ASCOM Device Hub 设置中，根据需要配置设备
- 这通常涉及为每台设备选择合适的驱动并配置必要的设置

c. **在 N.I.N.A. 中连接设备**：

- 打开 N.I.N.A.
- 导航到 `设备` 标签页
- 导航到对应设备的子标签页
- 为每台相关设备选择 `Device Hub` 作为驱动
- 通过 N.I.N.A. 连接设备

### 使用 Optec ASCOM Server

a. **下载并安装 Optec ASCOM Server**：

- 从 [Optec 网站](https://optecinc.com/downloads/legacy/optecascomserver/)下载 Optec ASCOM Server。按照提供的安装说明操作。

b. **选择 Optec ASCOM Server**：

- 打开 N.I.N.A.
- 导航到 `设备` 标签页
- 导航到对应设备的子标签页
- 选择 `Optec ASCOM Server` 条目

c. **配置设备**：

- 点击齿轮图标打开驱动设置
- 在 Optec ASCOM Server 设置中，根据需要配置设备
- 这通常涉及为每台设备选择合适的驱动并配置必要的设置

d. **在 N.I.N.A. 中连接设备**：

- 打开 N.I.N.A.
- 导航到 `设备` 标签页
- 导航到对应设备的子标签页
- 为每台相关设备选择 `Optec ASCOM Server` 作为驱动
- 通过 N.I.N.A. 连接设备

## 补充提示

- **验证驱动兼容性**：确保使用设备的最新可用驱动。检查制造商网站以获取有关 .NET 8 的任何更新或兼容性说明。
- **咨询 ASCOM 社区**：如果遇到持续存在的问题，建议咨询 ASCOM 社区论坛或 N.I.N.A. Discord 服务器以获得额外支持。
