import '../Utils/dartUtils.dart';

void main(){
  int solutionP1, solutionP2;

  var demoInput = parseInput(Utils.readToString("./demo-input.txt"));
  Stopwatch stopwatch = new Stopwatch()..start();
  var input = parseInput(Utils.readToString("./input.txt"));
  var timeParse = stopwatch.elapsedMilliseconds;

  solutionP1 = solvePart1(input);
  var timeP1 = stopwatch.elapsedMilliseconds;
  
  solutionP2 = solvePart2(input);
  var timeP2 = stopwatch.elapsedMilliseconds;

  print('Parse time: ${timeParse * 1/1000}s');
  print('Part 1 (${(timeP1 - timeParse) * 1/1000}s): ${solutionP1}');
  print('Part 2 (${(timeP2 - timeP1) * 1/1000}s): ${solutionP2}');
  print('Ran in ${stopwatch.elapsedMilliseconds * 1/1000} seconds');
}

Object parseInput(String input) {
  return input;
}

int solvePart1(Object input) {
  return 0;
}

int solvePart2(Object input) {
  return 0;
}