# 视频截屏缩略图

---

videojs播放器展示视频截屏雪碧图插件（videojs6）

## 何时使用

- 需要videojs播放器的进度条在hover的时候展示截屏雪碧图的时候

## 浏览器支持

IE 9+

## 安装

```bash
npm install videojs-thumbnails-sprite --save
```

## 运行

```bash
# 安装依赖
npm install

# 开启服务
npm start
```

## 代码演示

### 基本

为进度条添加单张截屏雪碧图

```js
  var player =  videojs('videojs-sprite-thumbnails-player');
  player.spriteThumbnails({
    interval: 1,
    path: [
      'img/oceans-thumbs.jpg',
    ],
    width: 240,
    height: 100,
  });
```

### 多张截屏雪碧图

视频的截屏雪碧图有多张的时候，设置图片path为数组

```js
  var player = videojs('videojs-sprite-thumbnails-player');
  player1.spriteThumbnails({
    path: [
      'img/thumbnail-1.jpg',
      'img/thumbnail-2.jpg'
    ],
    width: 240,
    height: 100,
  });
```

## API

| 参数        | 说明                                                | 类型        | 默认值 |
|----------- |---------------------------------------------------  | ----------  |-------|
| path       | 截屏雪碧图路径数组，当有多张的时候，按顺序写入                                | Array<String>      | []    |
| width  | 雪碧图中每张截屏的宽度 | number | 无 |
| height | 雪碧图中每张截屏的高度 | number | 无 |
| interval | 每张图片的间隔时间 | number | 1 |
