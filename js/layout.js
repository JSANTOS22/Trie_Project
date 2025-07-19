/*
    This is where the calculation of where each node should be
    - assignPositions(trie)
*/

function assignPositions(root, canvasWidth, startY = 80, spacing = 80) {
  let x = 0;
  const allNodes = [];

  function dfs(node, depth) {

    allNodes.push(node);

    // alphabetically order the nodes
    const children = Object.keys(node.children)
        .sort() 
        .map(key => node.children[key]);
    
    // base case for dfs, if length is 0
    if (children.length === 0) {
      node.x = x;
      node.y = startY + depth * spacing;
      node.y = node.y / 2;
      x += spacing;
      return node.x;
    }

    // find the most left and right x coordinate out of current node's children 
    let minX = Infinity, maxX = -Infinity;
    for (const child of children) {
      const childX = dfs(child, depth + 1);
      minX = Math.min(minX, childX);
      maxX = Math.max(maxX, childX);
    }

    // center parent based off of median of x coordinates of it's children
    node.x = (minX + maxX) / 2;
    node.y = startY + depth * spacing;
    node.y = node.y / 2;
    return node.x;
  }

  dfs(root, 0);
  centerTree(allNodes, canvasWidth);
}

function centerTree(nodes, canvasWidth) {
  let minX = Infinity;
  let maxX = -Infinity;

  // find the min and max x coordinate
  for (const node of nodes) {
    if (node.x < minX) minX = node.x;
    if (node.x > maxX) maxX = node.x;
  }

  // get the treeWidth from min and max and get offset to center whole tree horizontally
  const treeWidth = maxX - minX;
  const offsetX = (canvasWidth - treeWidth) / 2 - minX;

  for (const node of nodes) {
    node.x += offsetX;
  }
}