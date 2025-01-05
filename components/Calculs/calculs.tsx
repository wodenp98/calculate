"use client";
import React, { useState, useEffect, KeyboardEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import {
  generateCalculation,
  getRandomInt,
  generateAddition,
  generateSoustraction,
  generateMultiplication,
  generateDivision,
} from "@/utils/generateCalculation";
import { OperationType } from "@/types/operationType";

const Calculs: React.FC = () => {
  const searchParams = useSearchParams();

  const count = searchParams.get("count") || "10";
  const delay = searchParams.get("delay") || "10";
  const difficulty = (searchParams.get("difficulty") || "moyen") as
    | "facile"
    | "moyen"
    | "difficile";
  const operationType = (searchParams.get("operation") ||
    "mixed") as OperationType;

  const [calculations, setCalculations] = useState<
    { operation: string; result: number }[]
  >([]);
  const [currentCalculation, setCurrentCalculation] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(Number(delay));
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const numCalculations = parseInt(count, 10);
    const delayMs = parseInt(delay, 10) * 1000;
    let index = 0;

    const handleKeyPress = (event: any) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress as EventListener);

    const interval = setInterval(() => {
      if (!isPaused && index < numCalculations) {
        const newCalculation = generateCalculation(operationType, difficulty);
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
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [count, delay, difficulty, operationType, isPaused]);

  const handleShowResults = () => {
    setShowResults(true);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const getOperationTitle = () => {
    switch (operationType) {
      case "addition":
        return "Additions";
      case "soustraction":
        return "Soustractions";
      case "multiplication":
        return "Multiplications";
      case "division":
        return "Divisions";
      case "mixed":
        return "Opérations mélangées";
      default:
        return "Calcul Mental";
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {completed ? (
        <Card className="w-3/4 mb-10">
          <CardHeader>
            <CardTitle>
              <div className="text-2xl">Résultats - {getOperationTitle()}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl flex items-center justify-center">
            <ul className="w-full space-y-4">
              {calculations.map((calc, index) => (
                <li key={index} className="flex justify-between">
                  <span>{calc.operation}</span>
                  {showResults && (
                    <span className="font-bold">{calc.result}</span>
                  )}
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
              <div className="text-xl md:text-2xl">
                {getOperationTitle()} - CM1
              </div>
              <div className="flex items-center justify-between space-x-4 w-28">
                <Button variant="ghost" onClick={togglePause}>
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </Button>
                <span className="text-3xl">{timeLeft}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-5xl md:text-9xl flex items-center justify-center h-80">
            {currentCalculation ? currentCalculation : "Prêt ?"}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Calculs;
