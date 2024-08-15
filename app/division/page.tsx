/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDivision(
  leftMax: number,
  rightMax: number
): { operation: string; result: number } {
  const num2 = getRandomInt(1, rightMax);

  // Ensure num1 has the correct number of digits and is divisible by num2
  let num1;
  do {
    num1 = getRandomInt(1, leftMax);
  } while (num1 % num2 !== 0);

  return { operation: `${num1} / ${num2}`, result: num1 / num2 };
}

const Division: React.FC = () => {
  const searchParams = useSearchParams();

  const count = searchParams.get("count");
  const delay = searchParams.get("delay");
  const leftDigits = searchParams.get("leftDigits");
  const rightDigits = searchParams.get("rightDigits");

  const [calculations, setCalculations] = useState<
    { operation: string; result: number }[]
  >([]);
  const [currentCalculation, setCurrentCalculation] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(Number(delay));

  useEffect(() => {
    if (count && delay && leftDigits && rightDigits) {
      const numCalculations = parseInt(count, 10);
      const delayMs = parseInt(delay, 10) * 1000;
      const leftMax = Math.pow(10, parseInt(leftDigits, 10)) - 1;
      const rightMax = Math.pow(10, parseInt(rightDigits, 10)) - 1;
      let index = 0;

      const interval = setInterval(() => {
        if (index < numCalculations) {
          const newCalculation = generateDivision(leftMax, rightMax);
          setCalculations((prev) => [...prev, newCalculation]);
          setCurrentCalculation(newCalculation.operation + " = ?");
          setTimeLeft(parseInt(delay, 10));

          index++;
        } else {
          setCompleted(true);
          clearInterval(interval);
        }
      }, delayMs);

      const countdownInterval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [count, delay, leftDigits, rightDigits]);

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!completed ? <h1>Calculs en cours</h1> : ""}
      {completed ? (
        <div>
          <h2>Calculs terminés</h2>
          <ul>
            {calculations.map((calc, index) => (
              <li key={index}>
                {calc.operation} {showResults && `= ${calc.result}`}
              </li>
            ))}
          </ul>
          {!showResults && (
            <button onClick={handleShowResults}>Afficher les résultats</button>
          )}
        </div>
      ) : (
        <div>
          <h2>{currentCalculation}</h2>
          <p>
            Le prochain calcul s'affichera dans {timeLeft}{" "}
            {timeLeft > 1 ? "secondes" : "seconde"}...
          </p>
        </div>
      )}
    </div>
  );
};

export default Division;
