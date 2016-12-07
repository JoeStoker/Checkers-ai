function getJSON() {
	var str = '{'+
' "name": "flare",'+
' "children": ['+
'  {'+
 '  "name": "analytics",'+
  ' "children": ['+
  '  {'+
    ' "name": "cluster",'+
    ' "children": ['+
   '   {"name": "graph",'+
   '"children": ['+
   '   {"name": "AgglomerativeCluster", "size": 3938},'+
    '  {"name": "CommunityStructure", "size": 3812},'+
    '  {"name": "HierarchicalCluster", "size": 6714},'+
    '  {"name": "MergeEdge", "size": 743}'+
    ' ]},'+
    '  {"name": "CommunityStructure", "size": 3812},'+
    '  {"name": "HierarchicalCluster", "size": 6714},'+
    '  {"name": "MergeEdge", "size": 6000}'+
    ' ]'+
   ' },'+
   ' {'+
    ' "name": "graph",'+
    ' "children": ['+
     ' {"name": "BetweennessCentrality", "size": 3534},'+
      '{"name": "LinkDistance", "size": 5731},'+
      '{"name": "MaxFlowMinCut", "size": 7840},'+
     ' {"name": "ShortestPaths", "size": 5914},'+
      '{"name": "SpanningTree", "size": 3416}'+
     ']'+
    '}]}]}';

	return str;
}
function getJSON2() {
  var str = '{'+
  '"nodes":['+
    '{"name":"Myriel","group":1},'+
    '{"name":"Myriel","group":0},'+
    '{"name":"Myriel","group":2}'+
    '],'+
  '"links":['+
   ' {"source":1,"target":0,"value":3},'+
   ' {"source":2,"target":0,"value":90}'+
    ']}';

  return str;
}