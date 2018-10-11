import videojs from 'video.js';

export default function spriteThumbs(player, options) {
  const path = options.path;
  const height = options.height;
  const width = options.width;
  const interval = options.interval;

  if (!path.length || !height || !width) {
    return;
  }

  const dom = videojs.dom || videojs;
  const controls = player.controlBar;
  const progress = controls.progressControl;
  const seekBar = progress.seekBar;
  const mouseTimeDisplay = seekBar.mouseTimeDisplay;
  if (!mouseTimeDisplay) {
    return;
  }

  // 设置样式
  const tooltipStyle = (obj) => {
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const ttStyle = mouseTimeDisplay.timeTooltip.el_.style;

      if (val !== '') {
        ttStyle.setProperty(key, val);
      } else {
        ttStyle.removeProperty(key);
      }
    });
  };

  let rows = 0;
  let columns = 0; // 缩略图列数
  let imgWidth = 0;
  let imgHeight = 0;
  let shots = 0; // 每张雪碧图有多少个截屏
  // load sprite early
  dom.createEl('img', {
    src: path[0]
  }).onload = (ev) => {
    const target = ev.target;

    imgWidth = target.naturalWidth;
    imgHeight = target.naturalHeight;
    columns = Math.floor(imgWidth / width);
    rows = Math.floor(imgHeight / height);
    shots = rows * columns
  };

  const hijackMouseTooltip = () => {
    if (!columns) {
      return;
    }

    // 鼠标在进度条对应的时间
    const hoverTime = Math.floor(player.duration() * (parseFloat(mouseTimeDisplay.el_.style.left) / seekBar.el_.clientWidth));
    if (isNaN(hoverTime)) {
      return;
    }

    const currentShot = hoverTime % (interval * shots) // 第几张截屏
    const row = Math.floor(currentShot % (interval * columns)) / interval;
    const column = Math.floor(currentShot / (interval * columns));
    const cLeft = -row * width;
    const cTop = -column * height;
    const controlsTop = dom.getBoundingClientRect(controls.el_).top;
    const seekBarTop = dom.getBoundingClientRect(seekBar.el_).top;
    // top of seekBar is 0 position
    let topOffset = -height
    if (controlsTop < seekBarTop) {
      topOffset -= (seekBarTop - controlsTop);
    }

    let page = 0
    if (path.length > 1) {
      page = Math.floor(hoverTime / interval / shots);
    }

    tooltipStyle({
      'width': width + 'px',
      'height': height + 'px',
      'background-image': 'url(' + path[page] + ')',
      'background-repeat': 'no-repeat',
      'background-position': cLeft + 'px ' + cTop + 'px',
      'top': topOffset + 'px',
      'color': '#fff',
      'text-shadow': '1px 1px #000',
      'border': '1px solid #000',
      'margin': '0 1px'
    });
  };

  player.ready(() => {
    progress.on('mousemove', hijackMouseTooltip);
    progress.on('touchmove', hijackMouseTooltip);
  });
  player.addClass('vjs-sprite-thumbnails');
}
