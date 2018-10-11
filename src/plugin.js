import videojs from 'video.js';
import spriteThumbs from './sprite-thumbnails.js';
import {version as VERSION} from '../package.json';

/**
 * Default plugin options
 *
 * @param {String} path
 *        Sprite location. Must be set by user.
 * @param {Integer} width
 *        Width in pixels of a thumbnail. Must be set by user.
 * @param {Integer} height
 *        Height in pixels of a thumbnail. Must be set by user.
 * @param {Number} interval
 *        Interval between thumbnail frames in seconds. Default: 1.
 */
const defaults = {
  path: [],
  width: 0,
  height: 0,
  interval: 1
};

/**
 * The video.js sprite thumbnails plugin.
 *
 * Invokes spriteThumbs to set up and display thumbnails from a sprite image
 * when the user hovers over the progress bar.
 *
 * @function spriteThumbnails
 * @param    {Object} options
 *           Object accepting 4 plugin configuration parameters.
 */
const spriteThumbnails = function(options) {
  spriteThumbs(this, videojs.mergeOptions(defaults, options));
};

// Register the plugin with video.js.
videojs.registerPlugin('spriteThumbnails', spriteThumbnails);

// Include the version number.
spriteThumbnails.VERSION = VERSION;

export default spriteThumbnails;
