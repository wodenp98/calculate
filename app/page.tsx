/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [calculsCount, setCalculsCount] = useState<number>(5);
  const [delay, setDelay] = useState<number>(30);
  const [operation, setOperation] = useState<string>("addition");
  const [leftDigits, setLeftDigits] = useState<number>(2);
  const [rightDigits, setRightDigits] = useState<number>(2);
  const router = useRouter();

  const startSession = () => {
    let path = "";

    switch (operation) {
      case "addition":
        path = `/addition?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
        break;
      case "soustraction":
        path = `/soustraction?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
        break;
      case "addition-soustraction":
        path = `/addition-soustraction?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
        break;
      case "multiplication":
        path = `/multiplication?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
        break;
      case "division":
        path = `/division?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
        break;
      default:
        path = `/calculs?count=${calculsCount}&delay=${delay}&leftDigits=${leftDigits}&rightDigits=${rightDigits}`;
    }

    router.push(path);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Générateur de Calculs</h1>
      <label>
        Nombre de calculs:
        <input
          type="number"
          value={calculsCount}
          min="1"
          max="100"
          onChange={(e) => setCalculsCount(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Délai entre les calculs (secondes):
        <input
          type="number"
          value={delay}
          min="1"
          max="60"
          onChange={(e) => setDelay(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Chiffres max à gauche:
        <input
          type="number"
          value={leftDigits}
          min="1"
          max="10"
          onChange={(e) => setLeftDigits(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Chiffres max à droite:
        <input
          type="number"
          value={rightDigits}
          min="1"
          max="10"
          onChange={(e) => setRightDigits(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Type d'opération:
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="addition">Addition</option>
          <option value="soustraction">Soustraction</option>
          <option value="addition-soustraction">Addition / Soustraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
        </select>
      </label>
      <br />
      <br />
      <button onClick={startSession}>Démarrer la session</button>
    </div>
  );
};

export default Home;
