# FITS

灵活图像传输系统（Flexible Image Transport System，简称 FITS）是一种灵活的开放文件格式，用于存储图像、光谱、光子列表、数据立方体等。数据以 N 维数组或表格形式存储。

N.I.N.A. 支持以 FITS 格式保存图像。FITS 格式提供多种文件头元信息，N.I.N.A. 会将所有可用信息填充到该文件头中。下面列出了所有可用文件头及其条件的详细说明。
许多应用程序都可以利用这些文件头（例如 PixInsight 在处理过程中）。

## 标准 FITS 文件头

- SIMPLE: true
- BITPIX: 16
- NAXIS: 2
- NAXIS1: 图像宽度
- NAXIS2: 图像高度
- BZERO: 32768
- EXTEND: true
- SWCREATE: N.I.N.A. `<version>` `<architecture>`

## 图像文件头

- IMAGETYP: 曝光类型（LIGHT、DARK 等）
- EXPOSURE: 曝光时长（秒）
- EXPTIME: 曝光时长（秒）
- DATE-LOC: 曝光开始时的本地时间
- DATE-UTC: 曝光开始时的 UTC 时间
- DATE-AVG: 平均中点时间（UTC）
- ROWORDER: TOP-DOWN 图像起点方向。[详见 free-astro.org](https://free-astro.org/index.php?title=Siril:FITS_orientation)

## 观测者文件头
取自天体测量选项

- SITEELEV: 海拔高度（当前取自连接的望远镜）
- SITELAT: 天体测量选项中指定的纬度
- SITELONG: 天体测量选项中指定的经度
- OBSERVER: 天体测量选项中指定的观测者姓名
- OBSERVAT: 天体测量选项中指定的天文台名称
- SITENAME: 天体测量选项中指定的地点名称

## 目标文件头
当序列中设置了目标时可用。

- OBJECT: 目标名称
- OBJCTRA: 目标的赤经
- OBJCTDEC: 目标的赤纬
- OBJCTROT: 拍摄目标的计划旋转角度

## 相机文件头
需要连接相机

- CAMERAID: 驱动程序提供的相机 ID
- INSTRUME: 相机名称
- XBINNING: X 方向合并因子
- YBINNING: Y 方向合并因子
- GAIN: 增益
- OFFSET: 偏置（如果相机可以设置偏置）
- EGAIN: 每 A/D 单位的电子数（仅部分相机可用）
- XPIXSZ: X 方向像素尺寸
- YPIXSZ: Y 方向像素尺寸
- SET-TEMP: 温度设定点（需要制冷装置）
- CCD-TEMP: 实际传感器温度（需要制冷装置）
- READOUTM: 传感器读出模式
- BAYERPAT: 传感器 Bayer 阵列模式
- XBAYROFF: Bayer 阵列 X 轴偏移
- YBAYROFF: Bayer 阵列 Y 轴偏移

## 望远镜文件头
需要连接望远镜

- TELESCOP: 望远镜名称
- FOCALLEN: 焦距（取��设备选项）
- FOCRATIO: 焦比（取自设备选项）
- RA: 望远镜当前赤经坐标
- DEC: 望远镜当前赤纬坐标
- PIERSIDE: 驱动程序报告的望远镜所在立柱侧


## 滤镜轮文件头
需要连接滤镜轮

- FWHEEL: 滤镜轮名称
- FILTER: 当前激活的滤镜

## 调焦器文件头
需要连接调焦器

- FOCNAME: 调焦器名称
- FOCPOS: 当前步进位置
- FOCUSPOS: 当前步进位置
- FOCUSSZ: 步长
- FOCTEMP: 温度（需要调焦器上的温度传感器）
- FOCUSTEM: 温度（需要调焦器上的温度传感器）

## 旋转器文件头
需要连接旋转器

- ROTNAME: 旋转器名称
- ROTATOR: 旋转器角度（度）
- ROTATANG: 旋转器角度（度）
- ROTSTPSZ: 步长

## 气象数据文件头
需要连接气象数据源

- CLOUDCVR: 云量百分比
- DEWPOINT: 露点（摄氏度）
- HUMIDITY: 湿度百分比
- PRESSURE: 气压（hPa）
- SKYBRGHT: 天光亮度（lux）
- MPSAS: 天空质量（星等/角秒^2）
- SKYTEMP: 天空温度（摄氏度）
- STARFWHM: 星点半高全宽
- AMBTEMP: 环境温度（摄氏度）
- WINDDIR: 风向：0=北，180=南，90=东，270=西
- WINDGUST: 阵风风速（公里/小时）
- WINDSPD: 风速（公里/小时）
