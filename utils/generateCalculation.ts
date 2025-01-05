import { OperationType } from "@/types/operationType";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateCalculation(
  operationType: OperationType,
  difficulty: "facile" | "moyen" | "difficile"
): { operation: string; result: number } {
  switch (operationType) {
    case "addition":
      return generateAddition(difficulty);
    case "soustraction":
      return generateSoustraction(difficulty);
    case "multiplication":
      return generateMultiplication(difficulty);
    case "division":
      return generateDivision(difficulty);
    case "mixed":
      const operations: OperationType[] = [
        "addition",
        "soustraction",
        "multiplication",
        "division",
      ];
      const randomOp =
        operations[Math.floor(Math.random() * operations.length)];
      return generateCalculation(randomOp, difficulty);
    default:
      throw new Error("Type d'opération non supporté");
  }
}

export function generateAddition(
  difficulty: "facile" | "moyen" | "difficile"
): {
  operation: string;
  result: number;
} {
  let num1: number, num2: number;

  switch (difficulty) {
    case "facile":
      num1 = getRandomInt(1, 20);
      num2 = getRandomInt(1, 20);
      break;
    case "moyen":
      num1 = getRandomInt(10, 100);
      num2 = getRandomInt(10, 100);
      break;
    case "difficile":
      num1 = getRandomInt(100, 999);
      num2 = getRandomInt(100, 999);
      break;
  }

  return {
    operation: `${num1} + ${num2}`,
    result: num1 + num2,
  };
}

export function generateSoustraction(
  difficulty: "facile" | "moyen" | "difficile"
): {
  operation: string;
  result: number;
} {
  let num1: number, num2: number;

  switch (difficulty) {
    case "facile":
      num2 = getRandomInt(1, 10);
      num1 = getRandomInt(num2, 20);
      break;
    case "moyen":
      num2 = getRandomInt(1, 50);
      num1 = getRandomInt(num2, 100);
      break;
    case "difficile":
      num2 = getRandomInt(1, 100);
      num1 = getRandomInt(num2, 999);
      break;
  }

  return {
    operation: `${num1} - ${num2}`,
    result: num1 - num2,
  };
}

export function generateMultiplication(
  difficulty: "facile" | "moyen" | "difficile"
): {
  operation: string;
  result: number;
} {
  let num1: number, num2: number;

  switch (difficulty) {
    case "facile":
      num1 = getRandomInt(2, 5);
      num2 = getRandomInt(2, 5);
      break;
    case "moyen":
      num1 = getRandomInt(2, 9);
      num2 = getRandomInt(2, 9);
      break;
    case "difficile":
      if (Math.random() > 0.5) {
        num1 = getRandomInt(11, 99);
        num2 = 10;
      } else {
        num1 = getRandomInt(2, 9);
        num2 = getRandomInt(11, 20);
      }
      break;
  }

  return {
    operation: `${num1} × ${num2}`,
    result: num1 * num2,
  };
}

export function generateDivision(
  difficulty: "facile" | "moyen" | "difficile"
): {
  operation: string;
  result: number;
} {
  let num1: number, num2: number;

  switch (difficulty) {
    case "facile":
      num2 = getRandomInt(2, 5);
      num1 = num2 * getRandomInt(1, 5);
      break;
    case "moyen":
      num2 = getRandomInt(2, 9);
      num1 = num2 * getRandomInt(1, 10);
      break;
    case "difficile":
      num2 = getRandomInt(2, 9);
      num1 = num2 * getRandomInt(1, 10) + getRandomInt(1, num2 - 1);
      break;
  }

  return {
    operation: `${num1} ÷ ${num2}`,
    result: Math.floor(num1 / num2),
  };
}
