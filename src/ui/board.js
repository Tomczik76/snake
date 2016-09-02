export default (ctx, scale) => {
  ctx.lineWidth = 20 * scale;
  ctx.strokeRect(0, 0, scale * 500, scale * 500)
}