import 'dart:ffi';

import '../Utils/dartUtils.dart';

void main(){
  int solutionP1, solutionP2;

  var demoInputOriginal = parseInput(Utils.readToString("./demo-input-original.txt"), false);
  var demoInputOriginalJoker = parseInput(Utils.readToString("./demo-input-original.txt"), true);
  var demoInput = parseInput(Utils.readToString("./demo-input.txt"), false);
  var demoInputJoker = parseInput(Utils.readToString("./demo-input.txt"), true);
  Stopwatch stopwatch = new Stopwatch()..start();
  var input = parseInput(Utils.readToString("./input.txt"), false);
  var inputJoker = parseInput(Utils.readToString("./input.txt"), true);

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

List<Card> parseInput(String input, bool joker) =>
  input.splitNewLine().map((line) => line.split(' ')).toList().map((e) => new Card(e[0], int.parse(e[1]), joker)).toList();

int solvePart1(List<Card> input) {
  input.sort((a, b) => Card.compareHands(a, b, false));

  // input.forEach((element) {
  //   print('Hand: ${element.hand} ${element.cards} Bid: ${element.bid}');
  // });

  int totalWinnings = 0;
  for (int i = 1; i <= input.length; i++) {
    int handWinnings = (i * input[i-1].bid);
    totalWinnings += handWinnings;
    // print('Cards: ${input[i-1].cards} Hand Rank ${input[i-1].hand.index}: Bid ${input[i-1].bid} * Rank $i = $handWinnings');
  }
  return totalWinnings;
}

int solvePart2(List<Card> input) {
  input.sort((a, b) => Card.compareHands(a, b, true));

  // input.forEach((element) {
  //   print('Hand: ${element.hand} ${element.cards} Bid: ${element.bid}');
  // });

  int totalWinnings = 0;
  for (int i = 1; i <= input.length; i++) {
    int handWinnings = (i * input[i-1].bid);
    totalWinnings += handWinnings;
    print('Cards: ${input[i-1].cards} Hand Rank ${input[i-1].hand.index}: Bid ${input[i-1].bid} * Rank $i = $handWinnings');
  }
  return totalWinnings;
}

enum HandType {
  HIGHCARD,
  ONEPAIR,
  TWOPAIR,
  THREEOFAKIND,
  FULLHOUSE,
  FOUROFAKIND,
  FIVEOFAKIND
}

Map<String, int> cardValues = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

Map<String, int> cardValuesJoker = {
  'J': 2,
  '2': 3,
  '3': 4,
  '4': 5,
  '5': 6,
  '6': 7,
  '7': 8,
  '8': 9,
  '9': 10,
  'T': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

class Card {
  String cards = '';
  late HandType hand;
  int bid = 0;

  Card(String hand, int bid, bool joker) {
    this.cards = hand;
    this.hand = evaluateHand(hand.split(''), joker);
    this.bid = bid;
  }

  static evaluateHand(List<String> handString, bool joker) {
    Map<String, int> cardTypeCount = {};

    for (var c in handString) {
      cardTypeCount[c] = (cardTypeCount[c] ?? 0) + 1;
    }

    switch (cardTypeCount.length) {
      case 5:
        return !joker ? HandType.HIGHCARD : HandType.ONEPAIR; // AKQ89 AJKQ8
      case 4:
        return !joker || cardTypeCount['J'] == 2 ? HandType.ONEPAIR : HandType.THREEOFAKIND; // JJAKQ JAA98
      case 3:
        return evaluateThreeOfKindOrTwoPair(cardTypeCount, joker);
      case 2:
        return evaluateFourOfAKindOrFullHouse(cardTypeCount, joker);
      case 1:
        return HandType.FIVEOFAKIND;
      default:
        return HandType.HIGHCARD;
    }
  }

  static HandType evaluateThreeOfKindOrTwoPair(Map<String, int> cardTypeCount, bool joker) =>
    (cardTypeCount.containsValue(3)) ? (!joker ? HandType.THREEOFAKIND : HandType.FOUROFAKIND) : (!joker ? HandType.TWOPAIR : HandType.THREEOFAKIND); // KKKJ8 KKK89 : KKJ8 KKQQ

  static HandType evaluateFourOfAKindOrFullHouse(Map<String, int> cardTypeCount, bool joker) =>
    (cardTypeCount.containsValue(4)) ? (!joker ? HandType.FOUROFAKIND : HandType.FIVEOFAKIND) : (!joker ? HandType.FULLHOUSE : HandType.FIVEOFAKIND); // KKKKJ KKKK8 JJJJK : KKKJJ KKK88
  
  static int compareHands(Card hand1, Card hand2, bool joker) {
    int comparison = hand1.hand.index.compareTo(hand2.hand.index);
    if (comparison != 0) return comparison;
    // print("h1:" + hand1.cards + "  h2:" + hand2.cards + " ${hand1.cards.compareTo(hand2.cards)}");
    return compareLetters(hand1.cards, hand2.cards, joker);
  }

  static int compareLetters(String hand1, String hand2, bool joker) {
    for (int i = 0; i < 5; i++) {
      int rank1 = !joker ? cardValues[hand1[i]] ?? 0 : cardValuesJoker[hand1[i]] ?? 0;
      int rank2 = !joker ? cardValues[hand2[i]] ?? 0 : cardValuesJoker[hand2[i]] ?? 0;

      int rankComparison = rank1.compareTo(rank2);
      if (rankComparison != 0) return rankComparison;
    }
    return 0;
  }
}