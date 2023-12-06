import '../Utils/dartUtils.dart';

void main(){
  bool runP1 = true;
  bool runP2 = false;
  int solutionP1 = 0;
  String solutionP2 = "";

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

class Game {
  late int id;
  List<Hand> hands = [];

  Game(String line) {
    this.id = int.parse(line.split(': ')[0].split(' ')[1]);
    List<String> handString = line.split(': ')[1].split('; ');
    handString.forEach((h) {
      List<String> cubes = h.split(', ');
      for (String c in cubes) {
        Hand hand = new Hand();
        List<String> cSplit = c.split(' ');
        // print(c);
        if (cSplit[1] == 'red') hand.redCount = int.parse(cSplit[0]);
        else if (cSplit[1] == 'blue') hand.blueCount = int.parse(cSplit[0]);
        else if (cSplit[1] == 'green') hand.greenCount = int.parse(cSplit[0]);
        this.hands.add(hand);
      }
    });
  }
}

class Hand {
  late int redCount = 0;
  late int blueCount = 0;
  late int greenCount = 0;

  String toString() {
    return 'red: ${redCount} + blue: ${blueCount} + green: ${greenCount}';
  }
}

List<Game> parseInput(String input) {
  List<String> lines = input.splitNewLine();
  List<Game> games = [];
  for (String line in lines) {
    Game game = new Game(line);
    games.add(game);
  }
  return games;
}

int solvePart1(List<Game> input) {
  int total = 0;
  input.forEach((game) {
    var valid = true;
    game.hands.forEach((hand) {
      if (hand.redCount > 12 || hand.blueCount > 14 || hand.greenCount > 13) valid = false;
    });
    if (valid) total += game.id;
  });
  return total;
}

String solvePart2(Object input) {
  return "";
}