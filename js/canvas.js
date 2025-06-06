const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const NODE_RADIUS = 12;

// clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// draws node
function drawNode(x, y, char, isHighlighted = false) {
  ctx.beginPath();
  ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = isHighlighted ? '#23bbef' : '#e0f7fa'; // highlight = yellow
  ctx.fill();
  ctx.strokeStyle = isHighlighted ? '#259bc3' : '#000';  // highlight border = gold
  ctx.stroke();

  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';
  ctx.fillText(char, x, y);
}

// draws an edge between two nodes
function drawEdge(parent, child, isHighlighted = false) {

  // gets the distance via distance formula dist = sqrt((x2-x1)^2 + (y2-y1)^2)
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // get offset so that edge doesn't draw into a node
  const offsetX = (dx / dist) * NODE_RADIUS;
  const offsetY = (dy / dist) * NODE_RADIUS;

  ctx.beginPath();
  ctx.moveTo(parent.x + offsetX, parent.y + offsetY);
  ctx.lineTo(child.x - offsetX, child.y - offsetY);
  ctx.strokeStyle = isHighlighted ? '#f44336' : '#000'; // highlight = red
  ctx.lineWidth = isHighlighted ? 2 : 1;
  ctx.stroke();

  // reset styles
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
}

// fully redraw the whole trie
function drawTrie(trie, highlightPath = []) {
  clearCanvas();

  if (!trie) return;

  const highlightSet = new Set(highlightPath);

  // post order traversal of trie, can do either traversal though
  function dfs(node) {
    for (const child of Object.values(node.children)) {
      const edgeHighlighted = highlightSet.has(node) && highlightSet.has(child);
      drawEdge(node, child, edgeHighlighted);
      dfs(child);
    }

    drawNode(node.x, node.y, node.char, highlightSet.has(node));
  }

  dfs(trie.root);
}
