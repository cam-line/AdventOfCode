class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(otherVector) {
      return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    subtract(otherVector) {
        return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }

    checkBoundaries(max) {
        const min = 0;
        return this.x <= max && this.x >= min && this.y <= max && this.y >= min;
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    fromString(stringVector) {
        const vectorArray = stringVector.split(',');
        return new Vector(vectorArray[0], vectorArray[1]);
    }
}


const Direction = {
	NORTH: [-1, 0],
	NORTHEAST: [-1, 1],
	EAST: [0, 1],
	SOUTHEAST: [1, 1],
	SOUTH: [1, 0],
	SOUTHWEST: [1, -1],
	WEST: [0, -1],
	NORTHWEST: [-1, -1],
}

const getGridVal = (y, x, grid, defaultVal=".") => {
	let val = grid.get(formatKey(y, x));
	if (val == undefined) val = defaultVal;
	return val;
}

const formatKey = (y, x) => `${y},${x}`;
const unformatKey = key => key.split(',').map(Number);


module.exports = {
    Vector,
    Direction
};