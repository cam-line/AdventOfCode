import '../Utils/dartUtils.dart';

void main(){
  bool runP1 = true;
  bool runP2 = false;
  String solutionP1, solutionP2 = "";

  var demoInput = parseInput(Utils.readToString("./demo-input.txt"));
  Stopwatch stopwatch = new Stopwatch()..start();
  var input = parseInput(Utils.readToString("./input.txt"));
  var timeParse = stopwatch.elapsedMilliseconds;

  if(runP1) solutionP1 = solvePart1(input);
  var timeP1 = stopwatch.elapsedMilliseconds;
  if(runP2) solutionP2 = solvePart2(input);
  var timeP2 = stopwatch.elapsedMilliseconds;

  print('Parse time: ${timeParse * 1/1000}s');
  if(runP1) print('Part 1 (${(timeP1 - timeParse) * 1/1000}s): ${solutionP1}');
  if(runP2) print('Part 2 (${(timeP2 - timeP1) * 1/1000}s): ${solutionP2}');
  print('Ran in ${stopwatch.elapsedMilliseconds * 1/1000} seconds');
}

Object parseInput(String input){
  return input;
}

String solvePart1(Object input){
  return input.toString();
}

String solvePart2(Object input) {
  return "";
}