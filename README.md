# 一个用于浏览器的HTML音乐播放器🎵

### 声明
**一切开发旨在学习，请勿用于非法用途**

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
```
已拦截跨源请求：同源策略禁止读取位于 file:///C:/Users/a2942/Desktop/musicplayer/list.txt 的远程资源。（原因：CORS 请求不是 http）。
```
      </li>
    </ul>
  </li>
</ol>

### 协议
请注意！本项目使用[GPLv3](https://github.com/Kyomotoi/Aya/blob/master/LICENSE)，意味着你可以运行本项目，并向你的用户提供服务，但出现对项目源码进行修改，则需要将你修改后的版本对你的用户开源。出现的一切责任，请自行处理。
