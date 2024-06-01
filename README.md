# 一个用于浏览器的HTML音乐播放器🎵

### 声明
**一切开发旨在学习，请勿用于非法用途**

### 在线尝试
<a href="http://a2942.net:5902/music/" target="_blank">http://a2942.net:5902/music/</a>
![image](https://github.com/a2942/html-music-player/assets/77714719/07ea53a4-70c0-47e4-84fc-e9785b851dd2)

### 支持的功能
<ol>
  <li>多媒体控件</li>
  <li>cookie存储播放模式及歌曲</li>
  <li>定位播放列表至播放的歌曲</li>
  <li>自动处理播放错误(上传播放错误至服务器，自动下一曲跳过错误)</li>
  <li>提供较为详细的控制台日志</li>
</ol>

![image](https://github.com/a2942/html-music-player/assets/77714719/1a0510a9-b90c-46c3-b4a2-8c825443a691)
![image](https://github.com/a2942/html-music-player/assets/77714719/94d545ca-5161-49f9-b859-3334d25fa90f)
![image](https://github.com/a2942/html-music-player/assets/77714719/383ce42e-6864-4070-a59d-877ed6e52e62)

### 食用方式
<ol>
  <li>下载本项目</li>
  <li>将其解压在您的WEB Server内</li>
  <li>在 <b>sounds</b> 放入你的音乐🎵文件</li>
  <li>运行 <b><i>updatelist.bat</i></b> 或 <b><i>updatelist.sh</i></b> 更新 list.txt </li>
  <li>在浏览器打开 index.html </li>
</ol>

### 疑问解惑
<ol>
  <li>为什么直接在本地打开pcindex.html或adindex.html无法运行？
    <ul>
      <li>
        因为浏览器安全策略，不允许直接访问用户的计算机目录。你可以在控制台看见
        <br>
        <code>已拦截跨源请求：同源策略禁止读取位于 file:///.../musicplayer/list.txt 的远程资源。（原因：CORS 请求不是 http）。</code>
      </li>
    </ul>
  </li>
</ol>

### 鸣谢
<ul>
  <li><a href="http://a2942.net:5902/" target="_blank">我</a> - 为代码编写、测试、纠正、在线随机图片提供支持</li>
  <li><a href="https://blog.csdn.net/luo1831251387/article/details/117365054" target="_blank">北极光之夜。</a> - 为基础网页框架提供支持</li>
  <li><a href="https://www.forchangeai.com/" target="_blank">FORCHANGE AI EDU</a> - 为代码方向提供支持(有一说一它提供小代码没问题，但是一旦代码多出来就大概率不行了)</li>
  <li><a href="https://code.visualstudio.com/" target="_blank">Visul Studio Code</a> - 代码编写工具及插件</li>
  <li><a href="https://www.google.cn/chrome/" target="_blank">Chrome引擎</a>的<a href="https://www.microsoft.com/edge" target="_blank">Microsoft Edge</a> - chrome://inspect 为其他设备提供开发者工具支持</li>
  <li><a href="https://github.com/nitanmarcel/waydroid-magisk" target="_blank">waydroid-magisk</a> - 为安装LSPosed软件提供支持</li>
  <li><a href="https://github.com/LSPosed/LSPosed" target="_blank">LSPosed</a> - 为安装XPosed软件提供支持</li>
  <li><a href="https://github.com/feix760/WebViewDebugHook" target="_blank">WebViewDebugHook</a> - 为调试安卓系统浏览器提供卓越支持</li>
  <li><a href="https://github.com/t4t5/sweetalert" target="_blank">SweetAlert</a> - 弹窗库或自定义的模态框</li>
  <li><b>你</b> - 为音乐文件错误提供反馈支持</li>
</ul>

### 协议
请注意！本项目使用[GPLv3](https://github.com/Kyomotoi/Aya/blob/master/LICENSE)，意味着你可以运行本项目，并向你的用户提供服务，但出现对项目源码进行修改，则需要将你修改后的版本对你的用户开源。出现的一切责任，请自行处理。
