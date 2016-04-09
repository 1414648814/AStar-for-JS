(function(definition) {
  /* global module, define */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    define([], definition);
  } else {
    var exports = definition();
    window.astar = exports.astar;
    window.Graph = exports.Graph;
  }
})(function() {

//返回指向结点的路径结果
function pathTo(node) {
  	var curr = node;
  	var path = [];
  	while (curr.parent) {
    	path.unshift(curr);
    	curr = curr.parent;
  	}
  	return path;
}

function getHeap() {
  	return new BinaryHeap(function(node) {
    	return node.f;
  	});
}

var astar {
   	/**
  	* Perform an A* Search on a graph given a start and end node.
  	* @param {Graph} graph
  	* @param {GridNode} start
  	* @param {GridNode} end
  	* @param {Object} [options]
  	* @param {bool} [options.closest] Specifies whether to return the
             path to the closest node if the target is unreachable.
  	* @param {Function} [options.heuristic] Heuristic function (see
  	*          astar.heuristics).
  	*/
  	search: function(graph, start, end, options) {
	    graph.cleanDirty();

	    options = options || {};
	    var heuristic = options.heuristic || astar.heuristics.manhattan;
	    var closest = options.closest || false;

	    // 获取到堆
	    var openHeap = getHeap();
	    var closestNode = start; // set the start node to be the closest if required

	    start.h = heuristic(start, end);
	    // 标记开始结点
	    graph.markDirty(start);

	    // 加入到开启列表
	    openHeap.push(start);

	    //不断从开启列表中取结点
	    while (openHeap.size() > 0) {

	      	// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
	      	//取出现在的结点
	      	var currentNode = openHeap.pop();

	      	// End case -- result has been found, return the traced path.
	      	//结果已经找到,返回路径
	      	if (currentNode === end) {
	        	return pathTo(currentNode);
	      	}

	      	// Normal case -- move currentNode from open to closed, process each of its neighbors.
	      	//正常的情况下,移动现在的结点从开链表移动到闭链表,依次访问他的邻居结点;
	      	currentNode.closed = true;

	      	// Find all neighbors for the current node.
	      	//找出结点的所有邻居结点
	      	var neighbors = graph.neighbors(currentNode);

	      	//依次访问邻居结点
	      	for (var i = 0, il = neighbors.length; i < il; ++i) {
	        	var neighbor = neighbors[i];

	        	//判断邻居结点是否已经加入到关闭列表中，或者是不可到达，则不妨问
	        	if (neighbor.closed || neighbor.isWall()) {
	          	// Not a valid node to process, skip to next neighbor.
	          		continue;
	        	}

	        	// The g score is the shortest distance from start to current node.
	        	// g 的值代表着从开始结点到现在结点的最短距离
	        	// We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
	        	// 我们需要检查到达这个邻居结点的路径是否是所知道的最短路径
	        	var gScore = currentNode.g + neighbor.getCost(currentNode);
	        	var beenVisited = neighbor.visited;

	        	//如果结点没有被访问或者经过现在结点到达邻居结点的路径长度更短
	        	if (!beenVisited || gScore < neighbor.g) {

		          	// Found an optimal (so far) path to this node.  Take score for node to see how good it is.
		          	// 设置邻居的结点的属性
		          	// 标记邻居结点也被访问过
		          	neighbor.visited = true;
		          	// 设置邻居结点的父结点
		          	neighbor.parent = currentNode;
		          	// 重新计算邻居结点（经过现在结点的路径）的 g h f 值
		          	neighbor.h = neighbor.h || heuristic(neighbor, end);
		          	neighbor.g = gScore;
		          	neighbor.f = neighbor.g + neighbor.h;
		          	// 标记邻居结点
		          	graph.markDirty(neighbor);
		          	if (closest) {
		            	// If the neighbour is closer than the current closestNode or if it's equally close but has
		            	// a cheaper path than the current closest node then it becomes the closest node
		            	// 如果邻居结点比现在的结点更加靠近，拥有比通过现在的结点的路径更短，则设置邻居结点为靠近结果的点
		            	if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
		              		closestNode = neighbor;
		            	}
		          	}

		          	//如果没有被访问,则添加邻居结点到开启列表中
		          	if (!beenVisited) {
		            	// Pushing to heap will put it in proper place based on the 'f' value.
		            	// 基于邻居结点的 F 值放到堆中合适的位置
		            	openHeap.push(neighbor);
		          	} else {
		            	// Already seen the node, but since it has been rescored we need to reorder it in the heap
		            	// 对堆进行重新排序
		            	openHeap.rescoreElement(neighbor);
		          	}
	        	}
	      	}
	    }

	    if (closest) {
	      return pathTo(closestNode);
	    }

	    // No result was found - empty array signifies failure to find path.］
	    // 无法找到路径
	    return [];
  	}，

  	// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  	//启发式搜索
  	heuristics: {
	    manhattan: function(pos0, pos1) {
	      var d1 = Math.abs(pos1.x - pos0.x);
	      var d2 = Math.abs(pos1.y - pos0.y);
	      return d1 + d2;
	    },
	    diagonal: function(pos0, pos1) {
	      var D = 1;
	      var D2 = Math.sqrt(2);
	      var d1 = Math.abs(pos1.x - pos0.x);
	      var d2 = Math.abs(pos1.y - pos0.y);
	      return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
	    }
  	},
  	//重置结点
  	cleanNode: function(node) {
	    node.f = 0;
	    node.g = 0;
	    node.h = 0;
	    node.visited = false;
	    node.closed = false;
	    node.parent = null;
	}

};

/-------------------------------------------------------------------/
/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 * 是否允许斜对角移动
 */
function Graph(gridIn, options) {
	options = options || {};
	this.nodes = [];
	this.diagonal = !!options.diagonal;
	this.grid = [];
	for (var x = 0; x < gridIn.length; x++) {
	    this.grid[x] = [];

	    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
	      var node = new GridNode(x, y, row[y]);
	      this.grid[x][y] = node;
	      this.nodes.push(node);
	    }
	}
	this.init();
}

// 初始化所有的结点
Graph.prototype.init = function() {
	this.dirtyNodes = [];
	for (var i = 0; i < this.nodes.length; i++) {
		astar.cleanNode(this.nodes[i]);
	}
};

// 清除
Graph.prototype.cleanDirty = function() {
    for (var i = 0; i < this.dirtyNodes.length; i++) {
    	astar.cleanNode(this.dirtyNodes[i]);
  	}
  	this.dirtyNodes = [];
};

// 标记结点
Graph.prototype.markDirty = function(node) {
  	this.dirtyNodes.push(node);
};

// 获取到结点的所有邻居结点
Graph.prototype.neighbors = function(node) {
  	var ret = [];
  	var x = node.x;
  	var y = node.y;
  	var grid = this.grid;

  	// West
  	if (grid[x - 1] && grid[x - 1][y]) {
    	ret.push(grid[x - 1][y]);
  	}

  	// East
  	if (grid[x + 1] && grid[x + 1][y]) {
    	ret.push(grid[x + 1][y]);
  	}

  	// South
  	if (grid[x] && grid[x][y - 1]) {
    	ret.push(grid[x][y - 1]);
  	}

  	// North
  	if (grid[x] && grid[x][y + 1]) {
    	ret.push(grid[x][y + 1]);
  	}

  	if (this.diagonal) {
    	// Southwest
    	if (grid[x - 1] && grid[x - 1][y - 1]) {
      		ret.push(grid[x - 1][y - 1]);
    	}

    	// Southeast
    	if (grid[x + 1] && grid[x + 1][y - 1]) {
      		ret.push(grid[x + 1][y - 1]);
    	}

    	// Northwest
    	if (grid[x - 1] && grid[x - 1][y + 1]) {
      		ret.push(grid[x - 1][y + 1]);
    	}

    	// Northeast
    	if (grid[x + 1] && grid[x + 1][y + 1]) {
      		ret.push(grid[x + 1][y + 1]);
    	}
  	}

  	return ret;
};

Graph.prototype.toString = function() {
  	var graphString = [];
  	var nodes = this.grid;
  	for (var x = 0; x < nodes.length; x++) {
    	var rowDebug = [];
    	var row = nodes[x];
    	for (var y = 0; y < row.length; y++) {
      		rowDebug.push(row[y].weight);
    	}
    	graphString.push(rowDebug.join(" "));
  	}
  	return graphString.join("\n");
};


/-------------------------------------------------------------------/

function GridNode(x, y, weight) {
  	this.x = x;
  	this.y = y;
  	this.weight = weight;
}

GridNode.prototype.toString = function() {
  	return "[" + this.x + " " + this.y + "]";
};

//获取到从邻居结点到自己的权重
GridNode.prototype.getCost = function(fromNeighbor) {
  	// Take diagonal weight into consideration.
  	// 把对角线的权重也考虑进去，如果不属于同一行和同一列，也就是对角线；否则其返回自己的权重
  	if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
    	return this.weight * 1.41421;
  	}
  	return this.weight;
};
//返回该结点是否可以到达
GridNode.prototype.isWall = function() {
  	return this.weight === 0;
};


/----------------------------------------------------------/
//数据结构用来对结点的操作
BinaryHeap.prototype = {
  	push: function(element) {
	    // Add the new element to the end of the array.
	    this.content.push(element);

	    // Allow it to sink down.,
	    this.sinkDown(this.content.length - 1);
  	},

  	// 返回数组中开始的结点
  	pop: function() {
	    // Store the first element so we can return it later.\   存储
	    var result = this.content[0];
	    // Get the element at the end of the array.
	    var end = this.content.pop();
	    // If there are any elements left, put the end element at the
	    // start, and let it bubble up.
	    // 如果pop后还有元素，则将第一个元素设置为最后一个，再排序
	    if (this.content.length > 0) {
	      	this.content[0] = end;
	      	this.bubbleUp(0);
	    }
	    return result;
  	},

  	// 删除结点
  	remove: function(node) {
	    var i = this.content.indexOf(node);

	    // When it is found, the process seen in 'pop' is repeated
	    // to fill up the hole.
	    // 当找到的时候，将所在的位置的元素设置为最后一个，再排序
	    var end = this.content.pop();

	    if (i !== this.content.length - 1) {
	      	this.content[i] = end;
	      	// 如果现在元素的值比最后一个元素的值大
	      	if (this.scoreFunction(end) < this.scoreFunction(node)) {
	        	this.sinkDown(i);
	      	} else {
	        	this.bubbleUp(i);
	      	}
	    }
  	},

  	//
  	size: function() {
    	return this.content.length;
  	},

  	rescoreElement: function(node) {
    	this.sinkDown(this.content.indexOf(node));
  	},

  	// 下降（从小到大排序）
  	sinkDown: function(n) {
    	// Fetch the element that has to be sunk.
    	var element = this.content[n];

    	// When at 0, an element can not sink any further.
    	while (n > 0) {

      		// Compute the parent element's index, and fetch it.
      		var parentN = ((n + 1) >> 1) - 1;
      		var parent = this.content[parentN];
     		// Swap the elements if the parent is greater.
     		// 如果比上一个（父亲结点）小，则进行交换
      		if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        		this.content[parentN] = element;
        		this.content[n] = parent;
        		// Update 'n' to continue at the new position.
        		n = parentN;
      		}
      		// Found a parent that is less, no need to sink any further.
      		else {
        		break;
      		}
    	}
	},

	// 上升（从小到大排序）
  	bubbleUp: function(n) {
	    // Look up the target element and its score.
	    var length = this.content.length;
	    var element = this.content[n];
	    var elemScore = this.scoreFunction(element);

	    while (true) {
	      	// Compute the indices of the child elements.
	      	// 计算子结点的位置，以1为例，子分别是3，4
	      	var child2N = (n + 1) << 1;
	      	var child1N = child2N - 1;
	      	// This is used to store the new position of the element, if any.
	      	var swap = null;
	      	var child1Score;
	      	// If the first child exists (is inside the array)...
	      	if (child1N < length) {
	        	// Look it up and compute its score.
	       		var child1 = this.content[child1N];
	        	child1Score = this.scoreFunction(child1);

	        	// If the score is less than our element's, we need to swap.
	        	// 如果子的值小于父的值，则需要进行交换，
	        	if (child1Score < elemScore) {
	          		swap = child1N;
	        	}
	      	}

	      	// Do the same checks for the other child.
	      	if (child2N < length) {
	        	var child2 = this.content[child2N];
	        	var child2Score = this.scoreFunction(child2);
	        	if (child2Score < (swap === null ? elemScore : child1Score)) {
	          		swap = child2N;
	        	}
	      	}

	      	// If the element needs to be moved, swap it, and continue.
	      	if (swap !== null) {
	        	this.content[n] = this.content[swap];
	        	this.content[swap] = element;
	        	n = swap;
	      	}
	      	// Otherwise, we are done.
	      	else {
	        	break;
	      	}
		}
  	}
};


/------------------------------------------------------/
return {
  astar: astar,
  Graph: Graph
};


})；