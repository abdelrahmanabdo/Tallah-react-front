/**
 * tack page view.
 *
 * @param {String} path 
 * @param {Object} attrs
 * 
 * @public
 */

export function page(path, attrs = {}) {
  console.log('page ' + path);
  return window.analytics.page(path, {
    ...attrs,
  });
}