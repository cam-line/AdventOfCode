import 'dart:collection';
import 'dart:ffi';

import '../Utils/dartUtils.dart';

void main(){
  bool runP1 = true;
  bool runP2 = true;
  int solutionP1, solutionP2;

  var demoInput = padMatrix(parseInput(Utils.readToString("./demo-input.txt")), 10);
  Stopwatch stopwatch = new Stopwatch()..start();
  var input = padMatrix(parseInput((Utils.readToString("./input.txt"))), 140);
  var timeParse = stopwatch.elapsedMilliseconds;

  // if(runP1) solutionP1 = solvePart1(input);
  var timeP1 = stopwatch.elapsedMilliseconds;
  if(runP2) solutionP2 = solvePart2(input);
  var timeP2 = stopwatch.elapsedMilliseconds;

  print('Parse time: ${timeParse * 1/1000}s');
  // if(runP1) print('Part 1 (${(timeP1 - timeParse) * 1/1000}s): ${solutionP1}');
  if(runP2) print('Part 2 (${(timeP2 - timeP1) * 1/1000}s): ${solutionP2}');
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

bool checkSurroundings(int row, int col, List<List<String>> matrix, RegExp symbolMatch) {
  // check m[row][col-1], m[row][col+1] and m[row-1][col-1], m[row-1][col], m[row-1][col+1] and m[row+1][col-1], m[row+1][col], m[row+1][col+1] for a character that is not '.' or [1-9]
  String checkAbove = matrix[row-1][col-1] + matrix[row-1][col] + matrix[row-1][col+1];
  String checkBelow = matrix[row+1][col-1] + matrix[row+1][col] + matrix[row+1][col+1];
  String checkLeft = matrix[row][col-1];
  String checkRight = matrix[row][col+1];
  if (symbolMatch.hasMatch(checkLeft + checkRight 
                          + checkAbove
                          + checkBelow)) return true;

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
        if (checkSurroundings(row, col, input, new RegExp(r'[^.|0-9]'))) adjacentToSymbol = true;
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

Map<String, List<int>> starsPerNumberMap = new HashMap();

List<String> nextToStar(int row, int col, List<List<String>> matrix) {
  List<String> stars = [];
  RegExp matchStar = new RegExp(r'[*]');

  if (matchStar.hasMatch(matrix[row-1][col-1])) stars.add('${row-1}/${col-1}');
  if (matchStar.hasMatch(matrix[row-1][col])) stars.add('${row-1}/${col}');
  if (matchStar.hasMatch(matrix[row-1][col+1])) stars.add('${row-1}/${col+1}');

  if (matchStar.hasMatch(matrix[row+1][col-1])) stars.add('${row+1}/${col-1}');
  if (matchStar.hasMatch(matrix[row+1][col])) stars.add('${row+1}/${col}');
  if (matchStar.hasMatch(matrix[row+1][col+1])) stars.add('${row+1}/${col+1}');

  if (matchStar.hasMatch(matrix[row][col-1])) stars.add('${row}/${col-1}');
  if (matchStar.hasMatch(matrix[row][col+1])) stars.add('${row}/${col+1}');

  return stars;
}

int solvePart2(List<List<String>> input) {
  RegExp isDigit = new RegExp(r'[0-9]');
  int total = 0;

  for (int row = 1; row < input.length; row++) {
    String number = '';
    Set<String> stars = new Set();
    for (int col = 1; col < input.length; col++) {
      if (isDigit.hasMatch(input[row][col])) {
        number += input[row][col];
        nextToStar(row, col, input).forEach((c) { stars.add(c); });
      } 
      else {
        for (String c in stars) {
          // starsPerNumberMap[c]?.add(number as int) ??= [number as int];
          if (number != '') {
            if (starsPerNumberMap[c] != null) starsPerNumberMap[c]?.add(int.parse(number));
            else starsPerNumberMap[c] = [int.parse(number)];
          }
        }
        number = '';
        stars = new Set();
      }
    }
  }
  starsPerNumberMap.forEach((key, value) {
    if (value.length == 2) {
      total += (value[0] * value[1]);
    }
  });
  return total;
}