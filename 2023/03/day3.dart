import 'dart:ffi';

import '../Utils/dartUtils.dart';

void main(){
  bool runP1 = true;
  // bool runP2 = false;
  int solutionP1, solutionP2;

  var demoInput = padMatrix(parseInput(Utils.readToString("./demo-input.txt")), 10);
  Stopwatch stopwatch = new Stopwatch()..start();
  var input = padMatrix(parseInput((Utils.readToString("./input.txt"))), 140);
  var timeParse = stopwatch.elapsedMilliseconds;

  if(runP1) solutionP1 = solvePart1(input);
  var timeP1 = stopwatch.elapsedMilliseconds;
  // if(runP2) solutionP2 = solvePart2(input);
  var timeP2 = stopwatch.elapsedMilliseconds;

  print('Parse time: ${timeParse * 1/1000}s');
  if(runP1) print('Part 1 (${(timeP1 - timeParse) * 1/1000}s): ${solutionP1}');
  // if(runP2) print('Part 2 (${(timeP2 - timeP1) * 1/1000}s): ${solutionP2}');
  print('Ran in ${stopwatch.elapsedMilliseconds * 1/1000} seconds');
}

List<List<String>> parseInput(String input) =>
  input.splitNewLine().map((row) => row.split('')).toList();

List<List<String>> padMatrix(List<List<String>> input, int size) {
  List<String> topRow = [];
  List<String> bottomRow = [];

  for (int i = 0; i < size + 2; i++) {
    topRow.add('.');
    bottomRow.add('.');
    if (i < size) {
      input[i].insert(0, '.');
      input[i].add('.');
    }
  }
  input.insert(0, topRow);
  input.add(bottomRow);
  return input;
}

bool checkSurroundings(int row, int col, List<List<String>> matrix) {
  // check m[row][col-1], m[row][col+1] and m[row-1][col-1], m[row-1][col], m[row-1][col+1] and m[row+1][col-1], m[row+1][col], m[row+1][col+1] for a character that is not '.' or [1-9]
  String checkAbove = row != 0 ? matrix[row-1][col-1] + matrix[row-1][col] + matrix[row-1][col+1]: '';
  String checkBelow = row != 140 ? matrix[row+1][col-1] + matrix[row+1][col] + matrix[row+1][col+1] : '';
  String checkLeft = col != 0 ? matrix[row][col-1] : '';
  String checkRight = col != 140 ? matrix[row][col+1] : '';
  RegExp symbolMatch = new RegExp(r'[^.|0-9]');
  if (symbolMatch.hasMatch(checkLeft + checkRight 
                          + checkAbove
                          + checkBelow
                          )) return true;

  return false;
}

int solvePart1(List<List<String>> input){
  RegExp isDigit = new RegExp(r'[0-9]');
  int total = 0;

  for (int row = 1; row < input.length; row++) {
    String number = '';
    bool adjacentToSymbol = false;
    for (int col = 1; col < input.length; col++) {
      if (isDigit.hasMatch(input[row][col])) {
        number += input[row][col];
        if (checkSurroundings(row, col, input)) adjacentToSymbol = true;
      } 
      else {
        if (adjacentToSymbol) total += int.parse(number);
        number = '';
        adjacentToSymbol = false;
      }
    }
  }
  return total;
}

int solvePart2(Object input) {
  return 0;
}