/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Pause, Play } from "lucide-react";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(
  leftMax: number,
  rightMax: number
): { operation: string; result: number } {
  const num1 = getRandomInt(1, leftMax);
  const num2 = getRandomInt(1, rightMax);
  return { operation: `${num1} + ${num2}`, result: num1 + num2 };
}

const Addition: React.FC = () => {
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
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (count && delay && leftDigits && rightDigits) {
      const numCalculations = parseInt(count, 10);
      const delayMs = parseInt(delay, 10) * 1000;
      const leftMax = Math.pow(10, parseInt(leftDigits, 10)) - 1;
      const rightMax = Math.pow(10, parseInt(rightDigits, 10)) - 1;
      let index = 0;

      const interval = setInterval(() => {
        if (!isPaused && index < numCalculations) {
          const newCalculation = generateAddition(leftMax, rightMax);
          setCalculations((prev) => [...prev, newCalculation]);
          setCurrentCalculation(newCalculation.operation + " = ?");
          setTimeLeft(parseInt(delay, 10));
          index++;
        } else if (index >= numCalculations) {
          setCompleted(true);
          clearInterval(interval);
        }
      }, delayMs);

      const countdownInterval = setInterval(() => {
        if (!isPaused) {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [count, delay, leftDigits, rightDigits, isPaused]);

  console.log(!currentCalculation);

  const handleShowResults = () => {
    setShowResults(true);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {completed ? (
        <Card className="w-1/2 mb-10">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl">Résultats</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-6xl flex items-center justify-center">
            <ul>
              {calculations.map((calc, index) => (
                <li key={index} className="flex justify-between">
                  {calc.operation} {showResults && `= ${calc.result}`}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center">
            {!showResults && (
              <Button onClick={handleShowResults} variant="outline">
                Afficher les résultats
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-3/4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="text-2xl">Addition</div>
              <div className="flex items-center justify-between space-x-4 w-28">
                <Button variant="ghost" onClick={togglePause}>
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </Button>
                <span className="text-3xl">{timeLeft}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-9xl flex items-center justify-center h-80">
            {currentCalculation ? currentCalculation : "Concentrez-vous"}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Addition;
