import '../Utils/dartUtils.dart';

void main(){
  int solutionP1, solutionP2;

  Stopwatch stopwatch = new Stopwatch()..start();
  var timeParse = stopwatch.elapsedMilliseconds;

  solutionP1 = solvePart1();
  var timeP1 = stopwatch.elapsedMilliseconds;
  
  solutionP2 = solvePart2();
  var timeP2 = stopwatch.elapsedMilliseconds;

  print('Part 1 (${(timeP1 - timeParse) * 1/1000}s): ${solutionP1}');
  print('Part 2 (${(timeP2 - timeP1) * 1/1000}s): ${solutionP2}');
  print('Ran in ${stopwatch.elapsedMilliseconds * 1/1000} seconds');
}

/*
Time:        56     97     77     93
Distance:   499   2210   1097   1440
*/
Map races = {
  56: 499,
  97: 2210,
  77: 1097,
  93: 1440
};

int solvePart1() {
  int errorMarginProduct = 1;
  races.forEach((timeAllotted, currentRecord) {
    int waysToBeatRecord = 0;
    for (int i = 0; i < timeAllotted; i++) {
      int distanceMoved = (timeAllotted - i) * i;
      if (distanceMoved > currentRecord) waysToBeatRecord += 1;
    }
    errorMarginProduct *= waysToBeatRecord;
  });

  return errorMarginProduct;
}

int solvePart2() {
    int timeAllotted = 56977793;
    int currentRecord = 499221010971440;
    int waysToBeatRecord = 0;

    for (int i = 0; i < timeAllotted; i++) {
      int distanceMoved = (timeAllotted - i) * i;
      if (distanceMoved > currentRecord) waysToBeatRecord += 1;
    }

  return waysToBeatRecord;
}