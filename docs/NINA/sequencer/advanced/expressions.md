## 概述

NINA 3.3 新增了在指令选项中除了数值外还可以使用表达式的功能。表达式是一串文本，表示需要*计算*或*求值*的内容；求值的结果必须是该指令的有效选项。表达式可以包含数值、符号（下文定义）、数学、位运算和逻辑运算符（例如 +、-、|、&、||、&&）以及函数（例如 if、floor、between）；在特定位置，字符串（用单引号括起来的文本）也可以作为表达式的一部分。

### 符号

符号是代表某种值的名称。这些名称必须由数字、字母和下划线组成，且必须以字母开头。Fooble、fooble、foo_ble 和 fooble11 都是有效的符号；7fooble 和 foo#ble 则不是。在 NINA 中，有三类基本的符号：

#### 常量

常量通过 Define Constant 指令创建，需要提供名称和值。当加载到序列器中时，Define Constant 指令会*立即*执行，常量在整个序列中处处有效。您可以随时通过修改 Define Constant 指令中的值来更改常量的值；但如果这样做，所有引用该常量的地方都会立即反映新值。常量*不能*被正在运行的序列更改，没有指令可以改变常量的值。因此，常量最适合用于定义在序列运行过程中不会变化的符号。

![定义常量](../../images/sequencer/Sequencer_DefineConstant.png)

#### 变量

变量通过 Define Variable 指令创建，同样需要提供名称和值。与常量不同，变量在 Define Variable 指令于序列中执行之前*没有*值，并且它们*可以*在序列运行时通过 Set Variable 指令（或 Set Variable to Date/Time 指令）来修改。因此，变量最适合用于定义在序列运行过程中值预期会变化的符号。

![定义变量](../../images/sequencer/Sequencer_DefineVariable.png)

#### 数据

数据是*只读*的符号（即您不能修改它们），由 NINA 自身（表示已连接设备或 NINA 本身的状态）或插件（插件希望公开的任何内容）创建。可用数据的列表出现在序列器侧边栏的"符号"下方。此列表每五秒可视化更新一次，但使用数据符号的指令将始终使用指令*执行时刻*的值。

![符号](../../images/sequencer/Sequencer_Symbols.png)

:::tip[变量与作用域]
:::
NINA 中的变量具有一个叫*作用域*的属性（计算机编程术语，抱歉！）。简而言之，作用域定义了变量在序列中*何处*是*可见*的（即可使用的位置）。为简单起见，Define Variable 指令创建的是具有*全局作用域*的变量，这意味着序列中*任何位置*都可以使用它（一旦 Define Variable 指令运行之后）。

然而，有时您可能希望变量的可见性仅限于特定的指令集或模板。为此，请使用 Define Scoped Variable 指令。
:::

如果说符号是表达式的*名词*，那么运算符就是动词。它们描述值之间的交互方式——加、比较、组合、选择等。运算符包括算术、比较、逻辑和位运算符（前两类是小学就学过的知识）。表达式中也可以使用括号。以下是表达式中可以使用的运算符：

| 类型                | 示例                       |
|---------------------|----------------------------|
| 算术                | - ,   + ,  *,  /,  %       |
| 比较                | ==, !=,  &gt,  &lt;,  &gt=,  &lt;=   |
| 逻辑                | &&,  &nbsp;\|\|,&nbsp;   !                  |
| 位运算              | &,  &nbsp;\|,  ^,&nbsp;   ~,&nbsp;   &lt;&lt;,  &gt&gt         |
| 条件                | condition ? value_if_true : value_if_false      |


### 函数

函数是表达式中非常强大的补充。有许多内置函数，分为数学、逻辑、字符串和时间等类别。它们全部列在序列器侧边栏中，如下图所示。将鼠标悬停在函数名称上会显示该函数的使用示例。

![函数](../../images/sequencer/Sequencer_Functions.png)


### 表达式错误、警告和信息

下面是一个 Take Exposure 指令在 NINA 3.3 中可能的外观；您会看到一些新内容。

![表达式示例](../../images/sequencer/Sequencer_SymbolExampleInstruction.png)

表达式的当前值显示在花括号（大括号）中。

![表达式示例](../../images/sequencer/Sequencer_ExpressionValue.png)

如果将鼠标悬停在表达式本身上，您会看到表达式中每个符号是如何求值的。在此示例中，显示了 ExposureTime 和 FudgeFactor 的值。

![表达式错误](../../images/sequencer/Sequencer_SymbolValues.png)

右侧有一个红色错误三角，表示表达式有问题。将鼠标悬停在三角上会提示问题所在；此例中，引用了一个尚未定义的符号 CameraGain。

![未定义](../../images/sequencer/Sequencer_Undefined.png)

在此示例中，有一个橙色警告三角；这只是提醒您存在*潜在*问题，不会阻止序列运行。原因在于 CameraGain 变量已在上方指令中*声明*，但该指令尚未*运行*。如前所述，变量在定义它的指令实际*运行*之前没有值。一旦它*运行*，CameraGain 的值将为 100，警告将消失。

![警告](../../images/sequencer/Sequencer_ExpressionWarning.png)

以下是这两个相同指令在序列器中运行后的样子。请注意两件事：首先，Define Variable 指令现在显示变量的*当前*值（此例中为 100）；其次，Take Exposure 指令中的警告三角已消失，CameraGain 现在在花括号中显示一个值。

![警告消失](../../images/sequencer/Sequencer_ExpressionWarningGone.png)

### NINA 3.3 更新的指令

使用天体坐标的指令在 NINA 3.3 中外观略有不同；现在除了时-分-秒或度-分-秒格式外，还可以以十进制格式输入这些坐标。更改十进制值会自动更新 H-M-S/D-M-S 值，反之亦然。您也可以在十进制值的位置使用表达式。

![GOTO RA/Dec](../../images/sequencer/Sequencer_SlewToRaDec.png)  


### 条件执行

当一组指令仅在表达式为真时才运行时，使用条件指令集。表达式在到达该集时求值。若为真，则执行一次内部指令；若为假，则跳过内部指令，序列从该集之后继续运行。

表达式及其求值结果显示在集标题中，即使集处于折叠状态也是如此。条件指令集没有自己的循环条件或触发器区域；当该集位于其他指令集内部时，父级的循环条件和触发器仍然适用。

