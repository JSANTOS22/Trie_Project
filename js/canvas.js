/*
    This is where the low level drawing functions are
    - drawNode(x, y, char)
    - drawEdge(x1, y1, x2, y2)
    - clearCanvas()
    - drawHighlight(node)
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const NODE_RADIUS = 12;

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

function drawNode(x, y, char){
    // draw circle
    ctx.beginPath();
    ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = '#e0f7fa';
    ctx.fill();
    ctx.stroke();

    // inside circle design
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '12px Arial';
    ctx.fillText(char, x, y);
}

function drawEdge(parent, child) {
    // get the distance formula sqrt((x2-x1)^2 + (y2-y1)^2)
    const dx = child.x - parent.x;
    const dy = child.y - parent.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // create offset of edge so that line doesn't go through each node
    const offsetX = (dx / dist) * NODE_RADIUS;
    const offsetY = (dy / dist) * NODE_RADIUS;

    // draw the edge
    ctx.beginPath();
    ctx.moveTo(parent.x + offsetX, parent.y + offsetY);
    ctx.lineTo(child.x - offsetX, child.y - offsetY);
    ctx.stroke();
}

function drawIncremental(nodes) {
  for (const node of nodes) {
    if (node.domState !== 'new') continue;

    // if node has a parent, draw the edge
    if (node.parent) drawEdge(node.parent, node);
    drawNode(node.x, node.y, node.char);
    node.domState = 'existing';
  }
}