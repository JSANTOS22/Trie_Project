/*
    This is where the animation transitions and operations are
    - animateSearch(word)
    - animateTraversal(word), might need later on
*/
function animateSearch(path, node) {

  if (!node) return;

  if (path.has(node)) console.log(node);

  ctx.beginPath();
  ctx.arc(node.x, node.y, NODE_RADIUS + 4, 0, 2 * Math.PI);
  ctx.strokeStyle = path.has(node) ? '#4caf50' : '#0000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.lineWidth = 2;

  for (const child of Object.values(node.children)){
    animateSearch(path, child);
  }

}