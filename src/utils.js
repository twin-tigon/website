/**
 *
 * @param {string} str
 * @returns
 */
export function removeLitComments(str) {
  return str.replace(/<!--[^-]+-->/, '');
}
