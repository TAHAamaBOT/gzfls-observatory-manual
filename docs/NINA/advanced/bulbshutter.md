如果你有一台 Nikon DSLR 不支持通过 USB 进行 B 门超长曝光，这里有一个解决方案。
你可以不使用原生的 USB 模式，而是使用自制的 RS232 快门线，或者使用赤道仪的快门控制端口（如果可用）来控制快门。
你可以通过尝试拍摄一张超过 30 秒的曝光来测试是否需要外部快门线。
这将触发 Nikon DSLR 的 B 门模式。如果你的相机无法拍摄，就需要阅读本节内容。

:::tip
使用此功能的任何方法的前提条件是：你的 DSLR 必须有快门控制端口！
:::

你可以在相机设置中找到必要的设置。

![N.I.N.A. 相机设置](../images/advanced/bulbshutter/usage-bulbshutter-settings.png)

如果你的赤道仪有快门控制端口，建议先测试使用赤道仪进行 B 门快门控制，然后再尝试 RS232 方法。

## 使用 RS232 进行 B 门快门控制

触发 DSLR 快门机制的一种方法是使用自制的 RS232 转 B 门快门线。
网上已经有一些预制的此类线缆可供购买，你也可以自己 DIY。

:::tip
DSUSB 线缆不受支持，因为它们不暴露 COM 端口！
:::

你可以在这里找到一些关于如何制作 DIY 快门线的教程：

[Nikon MC-DC2](https://www.cloudynights.com/topic/457536-usb-corded-shutter-control-for-nikon/)

制作好 RS232 快门线后，你需要将它连接到电脑上，安装 RS232 适配器的驱动程序，并检查它使用的是哪个 COM 端口。
在 N.I.N.A. 中，你需要将"B 门模式"设置更改为"串口"，并将 COM 端口更改为你的 RS232 线缆使用的端口。

![N.I.N.A. 串口设置](../images/advanced/bulbshutter/usage-bulbshutter-serial.png)

之后，你可以尝试拍摄一张曝光时间超过 30 秒的图像。
如果成功了，就大功告成了，现在你可以进行任意时长的曝光了。

如果你在 N.I.N.A. 中使用 RS232 快门曝光时遇到问题，欢迎到我们的 [Discord](http://discord.gg/fwpmHU4) 上联系我们。

## 使用赤道仪进行 B 门快门控制

如果你的赤道仪有快门控制端口，并且有某种方式可以通过命令字符串来触发它，你可以使用它来触发 B 门快门机制。
要启用快门控制端口，你需要将"B 门模式"设置更改为"赤道仪快门端口"。

:::note
目前已确认并测试可通过赤道仪快门控制的赤道仪有：SkyWatcher NEQ6-R 和 AZ-EQ-6-GT（使用 EQMOD V200q），以及 SkyWatcher Star Adventurer GTI（使用 GSS）。
:::

![N.I.N.A. 赤道仪快门端口](../images/advanced/bulbshutter/usage-bulbshutter-mountsnapport.png)

首先，你需要从赤道仪的快门控制端口连接一条快门线到你的 DSLR。
为此，你可能需要一条 3.5mm 插头到你相机特定快门端口的线缆。
所有物理连接完成后，你需要将相机和赤道仪连接到 N.I.N.A.。
如果你的赤道仪有两个 SNAP 端口，你可以使用任意一个。两个都可以使用，具体取决于下一项设置。
下一步是设置与快门端口通信的命令字符串。

![N.I.N.A. 快门端口](../images/advanced/bulbshutter/usage-bulbshutter-snapport.png)

默认设置可能已经适用于你，所以可以自由尝试在 N.I.N.A. 中拍摄一张超过 30 秒的快照。
如果快门被触发，你就完成了设置，现在可以拍摄超过 30 秒的曝光了。

### EQMOD
默认情况下，快门端口启动和停止命令使用 EQMOD 标准，详细信息见[此处](http://eq-mod.sourceforge.net/docs/EQASCOM_compliancy.pdf)。

|                 | 开启\开始  | 关闭\停止  |
| :-------------- | :------:  | :------:  |
| **快门端口 1** | :SNAP1,1# | :SNAP1,0# |
| **快门端口 2** | :SNAP2,1# | :SNAP2,0# |

### Green Swamp Server (GSS)
对于 GSS，快门端口命令详见[此处](https://greenswamp.org/?docs=gs-server-overview/snap-tab)。

|                 | 开启\开始 | 关闭\停止 |
| :-------------- | :------: | :------: |
| **快门端口 1** | :O11     | :O10     |
| **快门端口 2** | :O21     | :O20     |

如果你的 B 门曝光仍然无法触发，请到我们的 [Discord](http://discord.gg/fwpmHU4) 上联系我们。
