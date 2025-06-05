/*
    This is where the calculation of where each node should be
    - assignPositions(trie)
*/

function assignPositions(root, canvasWidth, startY = 80, spacing = 80) {
  let x = 0;
  const allNodes = [];

  function dfs(node, depth) {
    allNodes.push(node);
    const children = Object.values(node.children);
    if (children.length === 0) {
      node.x = x;
      node.y = startY + depth * spacing;
      x += spacing;
      return node.x;
    }

    let minX = Infinity, maxX = -Infinity;
    for (const child of children) {
      const childX = dfs(child, depth + 1);
      minX = Math.min(minX, childX);
      maxX = Math.max(maxX, childX);
    }

    node.x = (minX + maxX) / 2;
    node.y = startY + depth * spacing;
    return node.x;
  }

  dfs(root, 0);
  centerTree(allNodes, canvasWidth);
}

function centerTree(nodes, canvasWidth) {
  let minX = Infinity;
  let maxX = -Infinity;

  for (const node of nodes) {
    if (node.x < minX) minX = node.x;
    if (node.x > maxX) maxX = node.x;
  }

  const treeWidth = maxX - minX;
  const offsetX = (canvasWidth - treeWidth) / 2 - minX;

  for (const node of nodes) {
    node.x += offsetX;
  }
}