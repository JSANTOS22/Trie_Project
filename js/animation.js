/*
    This is where the animation transitions and operations are
    - animateInsert(word)
    - animateSearch(word)
    - animateTraversal(word), might need later on
*/

function animateInsert(nodes) {
    drawIncremental(nodes);
}

function animateSearch(path) {
  for (const node of path) {
    // simple highlight functionality, will replace with actual animation step system later
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS + 4, 0, 2 * Math.PI);
    ctx.strokeStyle = '#4caf50';
    ctx.stroke();
    ctx.strokeStyle = '#000'; // reset
  }
}