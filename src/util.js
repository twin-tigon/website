export function removeLitComments(str) {
  return str.replace(/<!--[^-]+-->/, '');
}
