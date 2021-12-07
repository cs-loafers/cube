# 魔方辅助学习系统

Refer to https://gitee.com/nwu_hq/cube

[![Build Status](https://app.travis-ci.com/cs-loafers/cube.svg?branch=main)](https://app.travis-ci.com/cs-loafers/cube)

## 1. 项目环境

1. 该项目使用操作系统为 **Linux发行版Ubuntu 16.04**
2. 该项目的运行环境为 **python 2.7**
3. 该项目使用的框架为 **Django 1.11**
4. 项目依赖保存在 *requirement.txt* 文件中。

## 2.项目使用说明

### 1.项目准备

本项目已经基于*Django*框架创建了基本的文件。在项目的根目录下有一个requirement.txt文件，里面保存了项目所需要的运行依赖库。使用以下命令完整依赖的导入。

```bash
cube$ pip install -r requirement.txt
```

此过程需要较长时间，建议使用阿里云镜像库加快下载速度。

换源推荐：https://xiaopengzhen.blog.csdn.net/article/details/102953882

### 2. 项目测试

当完成了准备阶段的依赖导入以后，可以直接运行项目，也可以首先运行测试，检查目前环境配置是否正确。

运行test脚本启动测试：

```bash
cube$ bash test.sh
```

### 3. 项目运行

运行start脚本启动服务，脚本将Django应用映射到本机8000端口。

```bash
cube$ bash start.sh
```

在运行后就能看到以下命令行输出。

![初始化运行](pic/1.PNG)

在本地浏览器中，我们输入网址：**localhost:8000/index**，就能看到系统主界面。如下图所示

![index界面](pic/2.PNG)


点击上图的**Scramble**按钮，就能看到一个打乱的魔方。**我们可以在图中旋转我们的魔方**。如下如所示



![打乱的魔方](pic/3.PNG)





点击Solve按钮，我们就能看到复原的过程。



![solve](pic/4.PNG)

我们可以通过图中的左右按钮进行复原过程的查看。



## 3. 项目提高

该项目完成了自动输入魔方的样子，然后能够对给定的魔方样子进行复原。

首先我们还是按照 [项目运行](#2. 项目运行) 的命令启动我们的服务。

此时我们在浏览器中输入以下网址： **localhost:8000/indexPlus**

就能看到以下界面：





![indexPlus](pic/5.PNG)

其中的**Scramble**和**Solve**与之前的功能相同，我们加入了对魔方的操作，即以下字母表



|  U   |  D   |  L   |  R   |  F   |  B   |
| :--: | :--: | :--: | :--: | :--: | :--: |
|  U'  |  D'  |  L'  |  R'  |  F'  |  B'  |





不同的字母对应不同的操作，比如 **U**对应着将第一行的魔方向左转。

如下图所示

![U](pic/6.PNG)





所以我们可以通过按钮或者在文本框中输入我能想要的魔方样子，在3维立体与二维的平面中都能看到效果。**可以在3维魔方中旋转**。如下图所示。

![input](pic/7.PNG)





当我们点击 **Solve**按钮，我们可以看到复原过程。如下图：

![SolvePlus](pic/8.PNG)

如之前所述，依旧能够通过魔方上的左右进行过程的查看。


## 4. 其他


运行项目以前下载django
pip install django==1.11 -i https://pypi.tuna.tsinghua.edu.cn/simple

使用Ubuntu原装python2.7，导入项目依赖之前需要安装pip，直接安装python-pip可能出现invalid syntax问题，解决方法：安装新版本pip
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
python get-pip.py

运行项目时，提示please install the python-tk package，如果没有换国内源，在sudo apt install python时会出现have unmet dependencies问题

在虚拟机中push需要git clone时用git地址而非https地址，否则可能出现connection refused问题
