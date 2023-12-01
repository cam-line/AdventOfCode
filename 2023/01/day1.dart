import 'dart:ffi';

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

List<String> parseInput(String input){
  return input.splitNewLine();
}

String solvePart1(List<String> input){
    int total = 0;
    for(String i in input) {
      String numString = i.toString().replaceAll(new RegExp(r'[^0-9]'),'');
      var firstNum = numString.substring(0, 1);
      var lastNum = numString.substring(numString.length-1, numString.length);
      var endNums = firstNum + lastNum;
      total += int.parse(endNums);
    }
    
    return total.toString();
}

String solvePart2(Object input) {
  return "";
}