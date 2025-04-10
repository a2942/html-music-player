var imgs = "http://files.a2942.top:5902/tp/1-1/";     //随机专辑图片
var musuclist = "./list.txt";                     //歌单索引
var soundsfile = "./sounds/";                   //歌曲存储的文件夹

var logcolor1 = ('background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;');
var logcolor2 = ('background-color: #005656; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');
// 获取播放器元素
var player = document.getElementById('my-player');
var playlist = [];
var listItemold = 0;
var linkold = 0;
var currentIndex = getCookie("currentIndex");
var errornum = 0;
var loopMode = getCookie("loopMode");
// 获取音乐元素和唱片、杆元素
var audioElement = document.querySelector(".music");
var diskElement = document.querySelector(".disk");
var posterElement = document.querySelector(".poster");
var barElement = document.querySelector(".bar");

console.log(`%clog:%c外部javascript加载成功`, logcolor1, logcolor2);

function setCookie(cname, cvalue) {
    console.log(`%clog:%c保存cookie: ${cname}=${cvalue}`, logcolor1, logcolor2);
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log(`%clog:%c加载cookie: ${cname}`, logcolor1, logcolor2);
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}

if ('MediaMetadata' in window) {
    // 支持 MediaMetadata API
    br = 0;
    console.log(`%clog:%c浏览器支持媒体控件`, logcolor1, logcolor2);
    console.log(`%clog:%c您可以愉快的使用媒体控件方便的操作此播放器啦！`, logcolor1, logcolor2);
} else {
    // 不支持 MediaMetadata API
    br = 1;
    console.log(`%clog:%c浏览器不支持媒体控件`, logcolor1, logcolor2);
    console.error('您的浏览器内核已被区别对待，因为不支持媒体控件代码导致妨碍javascript继续运行');
}


if (currentIndex == "") { currentIndex = 0; }
if (loopMode == "") { loopMode = "列表循环"; }

console.log(`%clog:%c获取在线音乐库索引`, logcolor1, logcolor2);
fetch(musuclist)
    .then(response => response.text())
    .then(data => {
        playlist = data.split('\n');
        playlist = playlist.filter(song => song.trim() !== '');
        playlist2 = playlist;
        playlist = playlist.map(song => soundsfile + song);
        renderPlaylist();
        playCurrentSong();
    });

function renderPlaylist() {
    console.log(`%clog:%c开始加载播放列表`, logcolor1, logcolor2);
    // 获取播放列表的父元素
    var playlist = document.getElementById("playlist");
    // 循环创建播放列表项
    for (var i = 0; i < playlist2.length; i++) {
        // 创建 li 元素
        var listItem = document.createElement('li');
        listItem.id = "li" + i;
        if (i == currentIndex) { listItem.style = "background-color: rgba(0, 100, 200, 0.9);"; }
        // 创建 a 元素
        var link = document.createElement('a');
        link.id = "a" + i;
        if (i == currentIndex) { link.style = "background-image: url(img/playing.png);"; }
        link.href = "#";
        // 绑定点击事件监听器
        link.addEventListener('click', function () {
            // 获取点击的歌曲名称
            var songName = this.parentNode.textContent;
            // 获取点击的歌曲在数组中的索引
            var index = playlist2.indexOf(songName);
            // 更新当前播放歌曲索引
            currentIndex = index;
            // 执行播放当前歌曲的操作
            playCurrentSong();
        });
        // 将 a 元素添加到 li 元素中
        listItem.appendChild(link);
        listItem.appendChild(document.createTextNode(playlist2[i]));
        // 将 li 元素添加到播放列表中
        playlist.appendChild(listItem);
    }

}

// 播放当前歌曲
function playCurrentSong() {
    var posterElement = document.querySelector(".poster");
    var titleElement = document.querySelector(".title");
    var title1Element = document.querySelector(".title1");
    var newSrc = imgs + "?" + Date.now();
    setCookie("currentIndex", currentIndex);
    if (br != 1) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: playlist2[currentIndex],
            artist: playlist2[currentIndex],
            album: playlist2[currentIndex],
            artwork: [
                { src: newSrc, type: 'image/jpeg' },
            ],
        });
    }
    console.log(`%clog:%c获取随机专辑图片`, logcolor1, logcolor2);
    posterElement.src = newSrc;
    titleElement.textContent = playlist2[currentIndex];
    title1Element.textContent = "music音乐播放器 - " + playlist2[currentIndex];
    if (playlist.length > 0) {
        player.src = playlist[currentIndex];
        console.log(`%clog:%c触发播放音乐行为`, logcolor1, logcolor2);
        player.play().catch(function (error) {
            if (error.name === "NotAllowedError") {
                console.error("播放音乐时出错,因为您的浏览器安全策略，已被禁用自动播放!");
            } else if (error.name === "NotSupportedError") {
                console.error("播放音乐时出错：服务器资源异常、文件格式不支持、网络异常无法正确获得文件或文件被网络劫持。");
                // 发送请求错误日志
                const params = new URLSearchParams();
                params.append('err-music', playlist[currentIndex]);
                params.append('err-msg', '服务器资源异常、文件格式不支持、网络异常无法正确获得文件或文件被网络劫持');
                fetch('./log/', {
                    method: 'POST',
                    body: params
                });
                console.log(`%clog:%c已发送错误日志~`, 'background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #0c0; color: #000; border-radius: 0px 4px 4px 0px; padding: 4px;');
                errornum++;
                if (errornum <= 3) {
                    console.log(`%c此错误大概率并非由您引起的，而可能资源文件异常或网络不稳定的原因，您无需担心，即将自动切换下一首音乐`, 'background-color: #ffff00; color: #000; border-radius: 4px; padding: 4px;');
                    playNextSong();
                } else if (errornum <= 8) {
                    console.error('播放错误次数达到限制值，即将随机播放！');
                    enableRandom();
                    playCurrentSong();
                } else {
                    console.error('播放错误次数达到最大值，已停止播放！');
                    htmlerror();
                }
            } else {
                console.error("播放音乐时出错：", error.name, error);
                // 发送请求错误日志
                const params = new URLSearchParams();
                params.append('err-name', error.name);
                params.append('err-msg', error);
                fetch('./log/', {
                    method: 'POST',
                    body: params
                });
                console.log(`%clog:%c已发送错误日志,未来将会翻译错误并修复ta~`, 'background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #0c0; color: #000; border-radius: 0px 4px 4px 0px; padding: 4px;');
            }
            // 在这里显示本地化的错误信息给用户
            // 例如：alert("抱歉，无法播放音乐，请稍后再试。");
        });
    }
    var jumplist = document.getElementById("jumplist");
    var listItem = document.getElementById('li' + currentIndex);
    var link = document.getElementById('a' + currentIndex);
    jumplist.href = "#a" + currentIndex;
    listItem.style = "background-color: rgba(0, 100, 200, 0.9);";
    link.style = "background-image: url(img/playing.png);";
    if (listItemold == listItem) {
        listItemold = listItem;
        linkold = link;
    } else if (listItemold != "0") {
        listItemold.style = "";
        linkold.style = "";
    }
    listItemold = listItem;
    linkold = link;
}
// 切换循环模式
function switchLoopMode() {
    switch (loopMode) {
        case '列表循环':
            console.log(`%clog:%c将切换至随机播放`, logcolor1, logcolor2);
            loopMode = '随机播放';
            setCookie("loopMode", loopMode);
            enableRandom();
            break;
        case '随机播放':
            console.log(`%clog:%c将切换至单曲循环`, logcolor1, logcolor2);
            loopMode = '单曲循环';
            setCookie("loopMode", loopMode);
            enableRepeat();
            break;
        case '单曲循环':
            console.log(`%clog:%c将切换至列表循环`, logcolor1, logcolor2);
            loopMode = '列表循环';
            setCookie("loopMode", loopMode);
            enableLoop();
            break;
        default:
            break;
    }
}

if (navigator.mediaSession && navigator.mediaSession.previousTrack) {
    navigator.mediaSession.previousTrack = function () {
        playPreviousSong();
    };
}

// 上一首
function playPreviousSong() {
    console.log(`%clog:%c触发播放上一首音乐行为`, logcolor1, logcolor2);
    if (playlist.length > 0) {
        switch (loopMode) {
            case '列表循环':
                currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
                console.log('%c列表循环模式播放上一首音乐', 'background-color: green; color: white; border: 1px solid gray; border-radius: 4px; padding: 4px;');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break;
            case '随机播放':
                currentIndex = Math.floor(Math.random() * playlist.length);
                console.log('%c随机播放模式播放上一首音乐', 'background-color: green; color: white; border: 1px solid gray; border-radius: 4px; padding: 4px;');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break;
            case '单曲循环':
                console.error('单曲循环模式未能切换音乐!');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break; // 单曲循环下不切换当前索引
            default:
                break;
        }
        playCurrentSong();
    }
}

// 切换下一首播放
function playNextSong() {
    if (playlist.length > 0) {
        switch (loopMode) {
            case '列表循环':
                currentIndex = (currentIndex + 1) % playlist.length;
                console.log('%c列表循环模式播放下一首音乐', 'background-color: green; color: white; border: 1px solid gray; border-radius: 4px; padding: 4px;');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break;
            case '随机播放':
                currentIndex = Math.floor(Math.random() * playlist.length);
                console.log('%c随机播放模式播放下一首音乐', 'background-color: green; color: white; border: 1px solid gray; border-radius: 4px; padding: 4px;');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break;
            case '单曲循环':
                console.error('单曲循环模式未能切换音乐！');
                console.log(`%c当前正在播放：%c${currentIndex} - ${playlist2[currentIndex]}`, 'background-color: #006666; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #33ccff; color: #fff; font-weight: bold; border-radius: 0px 4px 4px 0px; padding: 4px;');
                break; // 单曲循环下不切换当前索引
            default:
                break;
        }
        playCurrentSong();
    }
}

// 列表循环
function enableLoop() {
    player.loop = false;
    console.log(`%c循环模式%c列表循环`, 'background-color: #222222; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #777777; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');
}

// 随机播放
function enableRandom() {
    if (playlist.length > 0) {
        currentIndex = Math.floor(Math.random() * playlist.length);
    }
    console.log(`%c循环模式%c随机播放`, 'background-color: #222222; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #777777; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');
}

// 单曲循环
function enableRepeat() {
    player.loop = true;
    console.log(`%c循环模式%c单曲循环`, 'background-color: #222222; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #777777; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');
}

// 绑定播放结束事件
player.addEventListener('ended', function () {
    console.log(`%clog:%c音乐播放结束`, logcolor1, logcolor2);
    errornum = 0;
    playNextSong();
});

// 切换循环模式按钮
function switchLoopModeButton() {
    var loopButton = document.getElementById('loop-button');
    loopButton.innerHTML = loopMode;
}

// 初始化循环模式按钮
function initLoopModeButton() {
    var loopButton = document.getElementById('loop-button');
    console.log(`%c循环模式%c${loopMode}`, 'background-color: #222222; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #777777; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');
    loopButton.innerHTML = loopMode;
}

// 页面加载完毕后初始化循环模式按钮
window.addEventListener('load', function () {
    console.log(`%clog:%c初始化循环模式`, logcolor1, logcolor2);
    initLoopModeButton();
});

// 按钮点击事件处理函数
function buttonClick() {
    switchLoopMode();
    switchLoopModeButton();
}

// 监听音乐播放事件
audioElement.addEventListener("play", function () {
    // 添加.turn类，启动唱片转动动画
    diskElement.classList.add("turn");
    posterElement.classList.add("turn");
    // 添加.playing类，使杆有旋转效果
    barElement.classList.add("playing");
    console.log(`%clog:%c音乐播放`, logcolor1, logcolor2);
});

// 监听音乐暂停事件
audioElement.addEventListener("pause", function () {
    console.log(`%clog:%c音乐暂停`, logcolor1, logcolor2);
    // 移除.turn类，停止唱片转动动画
    diskElement.classList.remove("turn");
    posterElement.classList.remove("turn");
    // 移除.playing类，停止杆的旋转效果
    barElement.classList.remove("playing");
});

if (br != 1) {
    // 设置上一首和下一首的控制器
    navigator.mediaSession.setActionHandler('previoustrack', function () {
        // 处理上一首逻辑
        console.log(`%clog:%c多媒体控件上一首被触发`, logcolor1, logcolor2);
        playPreviousSong();
        // 可以在这里切换到上一首音频
    });
    navigator.mediaSession.setActionHandler('nexttrack', function () {
        // 处理下一首逻辑
        console.log(`%clog:%c多媒体控件下一首被触发`, logcolor1, logcolor2);
        playNextSong();
        // 可以在这里切换到下一首音频
    });
    // 还可以设置其他的媒体控制事件处理程序，例如播放、暂停等等
}

function htmlerror() {
    Swal.fire({
        title: '网络异常!',
        text: '播放错误次数达到最大值，已停止播放！',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: '重新加载网页',
        cancelButtonText: '关闭窗口',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // 用户点击了确认按钮
            Swal.fire({
                title: '选择刷新方式',
                text: '直接刷新还是丢弃缓存刷新？',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '直接刷新',
                cancelButtonText: '彻底刷新',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // 用户点击了确认按钮
                    Swal.fire('即将刷新网页', '稍等片刻~', 'success');
                    setTimeout(function () {
                        console.log(`%clog:%c刷新网页`, 'background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #0c0; color: #000; border-radius: 0px 4px 4px 0px; padding: 4px;');
                        location.reload();
                    }, 2000);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // 用户点击了取消按钮
                    Swal.fire('即将刷新网页', '稍等片刻~', 'success');
                    setTimeout(function () {
                        console.log(`%clog:%c刷新网页`, 'background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;', 'background-color: #0c0; color: #000; border-radius: 0px 4px 4px 0px; padding: 4px;');
                        location.reload(true);
                    }, 2000);
                }
            });
        }
    });
}

