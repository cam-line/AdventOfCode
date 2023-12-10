import 'dart:math';

import '../Utils/dartUtils.dart';

void main() {
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

List<List<Set<String>>> parseInput(String input) => 
   input.splitNewLine().map((line) => 
    line.replaceAll(RegExp(r'\d*:|[^0-9 |]'), '').split('|')
    .map((col) => col.split(' ').where((element) => element.isNotEmpty).toSet()).toList()
  ).toList();

int solvePart1(List<List<Set<String>>> input) {
  int totalPoints = 0;
  for (List<Set<String>> card in input) {
    int wins = card[0].intersection(card[1]).length;
    if (wins == 0) continue;
    num points = pow(2, wins-1);
    totalPoints += points.toInt();
  }

  return totalPoints;
}

int solvePart2(List<List<Set<String>>> input) {
  int totalCopies = 0;
  Map<int, int> copies = Map.fromIterable(List<int>.generate(input.length, (index) => index), key: (key) => key, value: (value) => 0);
  for (int cardNumber = 0; cardNumber < input.length; cardNumber++) {
    copies.update(cardNumber, (value) => value + 1);
    List<Set<String>> card = input[cardNumber];
    int matches = card[0].intersection(card[1]).length;
    if (matches == 0) continue;
    for (int i = cardNumber + 1; i < cardNumber + 1 + matches; i++) {
      copies.update(i, (value) => value += copies[cardNumber]!);
    }
  }

  totalCopies = copies.values.toList().reduce((value, element) => value + element);
  return totalCopies;
}