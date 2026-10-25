# 刘彩云个人网站代码

## 本地打开
解压后，双击 index.html 即可查看网站。请保留整个目录结构。

建议使用本地服务器预览，复制联系方式等浏览器功能兼容性更好：
1. 在此目录打开终端。
2. Windows 运行：py -m http.server 8000
   macOS / Linux 运行：python3 -m http.server 8000
3. 浏览器访问：http://localhost:8000
4. 在终端按 Ctrl+C 停止。

这是静态网站，无需 npm 安装或构建。

## 页面
- index.html：首页，四个模块可前后切换。
- about.html：教育背景、校园经历、工具与能力。
- projects.html：作品展示，上下滚动翻页。
- cim-project.html：CIM 项目详情。
- fatigue-project.html：疲劳驾驶项目详情。
- experience.html：实习经历、分类筛选及时间轴节点高亮。
- contact.html：了解更多与联系方式。
- flood-project.html：内涝数字孪生项目简介与技术路线图。

## 样式与交互
- style.css、landing.css：基础样式、蓝色主题、响应式布局及各页样式；后者含最终覆盖规则。
- script.js：公共交互、复制联系方式等功能。
- orbit.js：首页模块前后切换。
- about-pages.js：校园经历时间轴高亮。
- works-pages.js：作品页滚动与键盘翻页。
- experience-timeline.js：实习经历节点切换。
- 其他 CSS / JavaScript 文件保留于包中，与当前网站源码一致。

## 素材与修改
- assets/resume.pdf：网站下载按钮使用的原始简历。
- assets/portrait.jpg：个人照片。
- assets/work-photo.png、experience-photo.jpg、contact-photo.jpg：首页模块图片。
- assets/flood-technical-route.png：内涝项目技术路线图。
- assets/handwriting.otf、font-license.txt：手写字体与许可说明。

页面文字直接在对应 HTML 中编辑。修改主题或排版时优先调整 landing.css；替换简历时覆盖 assets/resume.pdf。

## 部署
将本目录全部文件上传至任意静态网站托管服务，并将本目录设为站点根目录。首页为 index.html；所有页面使用相对链接。

本包包含截至本次导出的最新修改，包括第二个项目单行标题、更新后的门架视频轨迹研究简介及流程文字字号。
