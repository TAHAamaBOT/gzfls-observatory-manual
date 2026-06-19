# XISF

可扩展图像序列化格式（Extensible Image Serialization Format，简称 XISF）是由 PixInsight 创建的图像文件格式。它是一种自由格式，欢迎任何感兴趣的人贡献参与。有关该格式本身的更多详细信息，请参阅 [pixinsight.com/xisf](https://pixinsight.com/xisf/)。

N.I.N.A. 支持以 XISF 格式保存图像。XISF 格式提供多种文件头元信息，N.I.N.A. 会将所有可用信息填充到该文件头中。下面列出了所有可用文件头及其条件的详细说明。
许多应用程序都可以利用这些文件头（例如 PixInsight 在处理过程中）。

## 标准 XISF 文件头

- Version: 1.0
- CreationTime: 文件创建时间
- CreatorApplication: N.I.N.A. - Nighttime Imaging 'N' Astronomy

## [Observation 命名空间](http://pixinsight.com/doc/docs/XISF-1.0-spec/XISF-1.0-spec.html#__XISF_Core_Elements_:_Image_Core_Element_:_Astronomical_Image_Properties_:_Observation_Namespace__)

### Time
- Start: 曝光开始时的 UTC 时间

## Observer
- Name: 天体测量选项中指定的观测者姓名

### Location
- Elevation: 海拔高度（当前取自连接的望远镜）
- Latitude: 取自天体测量设置的纬度
- Longitude: 取自天体测量设置的经度
- Name: 天体测量选项中指定的地点名称

### Center
需要连接望远镜

- RA: 望远镜当前赤经坐标
- Dec: 望远镜当前赤纬坐标

### Object
当序列中设置了目标时可用。

- Name: 目标名称
- RA: 目标的赤经
- Dec: 目标的赤纬

### Meteorology
需要连接气象数据源

- RelativeHumidity: 相对湿度百分比
- AtmosphericPressure: 气压（hPa）
- AmbientTemperature: 环境温度（摄氏度）
- WindDirection: 风向：0=北，180=南，90=东，270=西
- WindGust: 阵风风速（公里/小时）
- WindSpeed: 风速（公里/小时）

## [Instrument 命名空间](http://pixinsight.com/doc/docs/XISF-1.0-spec/XISF-1.0-spec.html#__XISF_Core_Elements_:_Image_Core_Element_:_Astronomical_Image_Properties_:_Instrument_Namespace__)
- ExposureTime: 曝光时长（秒）

### Camera
需要连接相机

- Name: 相机名称
- Gain: 每 A/D 单位的电子数（仅部分相机可用）
- XBinning: X 方向合并因子
- YBinning: Y 方向合并因子

### Sensor
需要连接相机

- Temperature: 实际传感器温度（需要制冷装置）
- XPixelSize: 像素尺寸
- YPixelSize: 像素尺寸

### Telescope
需要连接望远镜

- Name: 望远镜名称
- FocalLength: 焦距（取自设备选项）
- Aperture: 焦距 / 焦比（取自设备选项）

### Filter
需要连接滤镜轮

- Name: 当前激活的滤镜

### Focuser
需要连接调焦器

- Position: 当前步进位置



:::tip 
此外，[FITS 描述](fits.md)中说明的所有信息都使用 [FITSKeyword 核心元素](http://pixinsight.com/doc/docs/XISF-1.0-spec/XISF-1.0-spec.html#__XISF_Core_Elements_:_FITSKeyword_Core_Element__)进行存储。
:::


## 压缩

N.I.N.A. 提供了使用压缩算法来尝试减小图像文件体积的可能性。
有三种可用算法：

- LZ4：此算法针对速度进行了优化。虽然压缩能力不如 Zlib，但它速度极快，大多数情况下能提供可接受的压缩效果。
- LZ4HC：基本上与 LZ4 相同的算法，但压缩率更高。计算量比纯 LZ4 稍大。
- Zlib：此算法在大多数场景下能产生最高的压缩效果，但处理时间较长，并且是计算量需求最大的算法。
- 字节重排选项会重新排列实际数据，试图优化其压缩效果。在大多数场景下，这会产生更好的压缩结果，但计算量稍大。

![压缩](../../images/advanced/XISF_Compression.png)

:::tip
有关压缩工作原理的更深入信息，请参阅 [XISF 数据块压缩](https://pixinsight.com/doc/docs/XISF-1.0-spec/XISF-1.0-spec.html#data_block_compression)
:::

## 校验和

此选项将在 XISF 文件中存储一个校验和值，以便能够验证数据完整性。

:::tip
有关校验和如何工作的更深入信息，请参阅 [XISF 数据块校验和](https://pixinsight.com/doc/docs/XISF-1.0-spec/XISF-1.0-spec.html#data_block_checksum)
:::
