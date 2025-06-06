/*
    This is where the animation transitions and operations are
    - animateSearch(word)
    - animateTraversal(word), might need later on
*/
function animateSearch(path, node) {

  if (!node) return;
  
  ctx.beginPath();
  ctx.arc(node.x, node.y, NODE_RADIUS + 2, 0, 2 * Math.PI);
  if (path.has(node)) {
    ctx.strokeStyle = "#4caf50";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
  } 

  for (const child of Object.values(node.children)) {
    animateSearch(path, child);
  }

}