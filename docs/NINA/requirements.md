# 系统要求与设备支持

## 最低系统要求

以下是运行 N.I.N.A. 所需的最低系统资源。

* 双核 x64 CPU
* 3GB 内存
* Windows 10（64 位）或更高版本
* 不含 SkyAtlas 图像数据或构图缓存数据时需要 500MB 可用磁盘空间（包含时需 3GB）

:::info
有用户报告在 Intel Compute Stick 等小型低功耗嵌入式系统上成功运行了 N.I.N.A.。可以预期的是，在这种资源受限的环境中，体验会因人而异。从技术上讲，N.I.N.A. 应该能够在单核上运行，但这无疑会带来*非常*不理想的体验，显然不推荐这样做。不过，如果在两者之间必须做出选择，更多的内存比更强的 CPU 运算能力更可取。
:::

## 推荐和可选的支持软件

N.I.N.A. 的功能在与其他应用程序配合使用时才能充分展现其优势。请考虑以下列表中的各项，以充分发挥 N.I.N.A. 的全部能力。

* [ASCOM Platform](//ascom-standards.org/Downloads/Index.htm)（推荐）
* [PHD2 Guiding](//openphdguiding.org/downloads/)
* [Metaguide Guiding](//www.smallstarspot.com/metaguide/)
* 以下任意一种受支持的[解析应用](advanced/platesolving.md)（推荐）
  * [ASTAP](//www.hnsky.org/astap.htm)
  * [All Sky Plate Solver](http://www.astrogb.com/astrogb/All_Sky_Plate_Solver.html)
  * [Local Astrometry.net (ansvr)](//adgsoftware.com/ansvr/)
  * [PlateSolve2](//planewave.com/downloads/software/)
  * [PlateSolve3](//planewave.com/downloads/software/)
  * [TheSkyX ImageLink](//www.bisque.com/)
  * [PinPoint](//diffractionlimited.com/)
* 以下任意一种受支持的星图应用（可选）
  * [Cartes du Ciel](//www.ap-i.net/skychart/)
  * [HNSKY](//www.hnsky.org/)
  * [Stellarium](//stellarium.org/)
  * [TheSky X](//www.bisque.com/sc/pages/TheSkyX-Editions.aspx)
  * [C2A](//www.astrosurf.com/c2a/english/download.htm)
  * [SkyTechX](//www.skytechx.eu/)
* [SkyAltas 图像数据](https://nighttime-imaging.eu/download/)（可选，位于下载部分的底部）

## 支持的设备

### 直接（原生）相机支持

N.I.N.A. 可以直接连接多种主流相机，无需借助中间 ASCOM 驱动。推荐使用直接相机控制而非通过 ASCOM 访问相机，这样性能更佳，而且能够使用 ASCOM 无法操控的额外相机控制选项。

* [Altair](//www.altairastro.com/)
* [Atik](//www.atik-cameras.com/)
* [AstcamPan](//microscope-cameras.com/)
* [Canon](//global.canon/)
* [FLI](//www.flicamera.com/)
* [MallinCam](//www.mallincam.net/)
* [Nikon](//www.nikon.com)
* [PlayerOne](//player-one-astronomy.com/)
* [OGMA](//getogma.com/)
* [Omegon](//www.omegon.eu)
* [QHYCCD](//www.qhyccd.com)
* [RisingCam](//risingcam.aliexpress.com/store/1918400)
* [ToupTek](//www.touptek-astro.com)
* [SBIG](//diffractionlimited.com)
* [SVBony](//www.svbony.com)
* [ZWO](//www.zwoastro.com)

:::note
某些较旧的 Nikon 数码单反相机需要串口快门线来进行 B 门曝光。请查阅相机文档，了解其通过 USB 或其他遥控线进行长曝光操作的具体要求。
:::

受支持的相机列表会随着 N.I.N.A. 开发者获得相关硬件或有人贡献支持代码而不断变化和扩展。

### [ASCOM 标准](https://ascom-standards.org/)

天文相关设备通常都配有 [ASCOM](//ascom-standards.org/) 驱动程序。N.I.N.A. 支持通过相关 ASCOM 驱动访问以下类型的设备，前提是这些驱动完全符合相应的 ASCOM 框架规范。未在 N.I.N.A. 中获得原生支持的相机，只要*有* ASCOM 驱动，也可以通过这种方式使用。以下 ASCOM 设备类型均受支持：

* 相机
* 赤道仪（即望远镜）
* 滤镜轮
* 平场板（ASCOM Cover Calibrator）
* 调焦器
* 旋转器
* 气象数据（ASCOM ObservingConditions）
* 圆顶
* 开关
* 安全设备

:::tip
请注意，如果厂商提供的 ASCOM 驱动仅支持 32 位，则该驱动将**无法**被 64 位的 N.I.N.A. 或任何其他 64 位 ASCOM 客户端应用直接调用。如果你的情况如此，请尝试通过 ASCOM Device Hub 进行连接。
:::

:::info[致 ASCOM 驱动开发者]
:::
如果尚未完成，请考虑同时为用户或客户提供 32 位和 64 位的驱动程序，并确保驱动通过所有 [ASCOM 合规性](//ascom-standards.org/Developer/Conformance.htm)测试。请参阅 ASCOM 网站上的[相关文档](//ascom-standards.org/Developer/DevFor32And64Bits.htm)以获取更多信息。
:::

### [ASCOM Alpaca](//www.ascom-alpaca.org/)

与 ASCOM 支持类似，N.I.N.A. 还提供 ASCOM Alpaca 设备发现功能，并支持通过网络直接连接到 ASCOM Alpaca 设备。ASCOM 标准部分中提到的所有设备类型也都可以通过 ASCOM Alpaca 协议使用。

### 额外的设备支持

虽然 N.I.N.A. 直接或通过 ASCOM 驱动为各类设备提供了广泛的支持，但还有更多[插件](tabs/plugins/available.md)可供选择，它们可以直接或间接地集成其他设备，从而提供更大的灵活性和更多的选择。

* [AstronSCIENTIFIC Rotarion 系统](//www.astronscientific.com/tech-info/)
  * 虽然 Rotarion 未直接集成到应用程序中，但可以通过可用的 ASCOM 驱动以及[连接器插件](tabs/plugins/available.md)对其进行完全控制，该插件可在为 Rotarion 系统上安装的不同仪器设置的不同配置文件之间进行切换。

### 导星应用

N.I.N.A. 支持多款导星应用，用于导星、抖动以及监测跟踪精度。这些应用的遥测数据也会显示在"拍摄"选项卡中。N.I.N.A. 支持的导星应用有：

* [PHD2](//openphdguiding.org/)
* [MetaGuide](//www.astrogeeks.com/Bliss/MetaGuide/)
* [MGEN2](//mgen-autoguider.com/en/)
* [MGEN3](//mgen-autoguider.com/en/)
* [SkyGuard](//www.innovationsforesight.com/)
