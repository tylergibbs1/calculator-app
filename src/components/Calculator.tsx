"use client";

import { useState, useEffect, useCallback } from "react";

type Operator = "+" | "-" | "*" | "/";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (waitingForOperand) return;
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display, waitingForOperand]);

  const toggleSign = useCallback(() => {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  }, [display]);

  const calculate = useCallback((left: number, right: number, op: Operator): number => {
    switch (op) {
      case "+": return left + right;
      case "-": return left - right;
      case "*": return left * right;
      case "/": return right !== 0 ? left / right : 0;
      default: return right;
    }
  }, []);

  const performOperation = useCallback((nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operator) {
      const currentValue = parseFloat(previousValue);
      const result = calculate(currentValue, inputValue, operator);
      const resultStr = String(parseFloat(result.toFixed(10)));
      setDisplay(resultStr);
      setPreviousValue(resultStr);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, previousValue, operator, calculate]);

  const equals = useCallback(() => {
    if (operator === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    const result = calculate(currentValue, inputValue, operator);
    const resultStr = String(parseFloat(result.toFixed(10)));

    setDisplay(resultStr);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, previousValue, operator, calculate]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (key >= "0" && key <= "9") {
      event.preventDefault();
      inputDigit(key);
    } else if (key === ".") {
      event.preventDefault();
      inputDecimal();
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      event.preventDefault();
      performOperation(key as Operator);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      equals();
    } else if (key === "Backspace") {
      event.preventDefault();
      backspace();
    } else if (key === "Escape" || key === "c" || key === "C") {
      event.preventDefault();
      clear();
    }
  }, [inputDigit, inputDecimal, performOperation, equals, backspace, clear]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const Button = ({
    children,
    onClick,
    className = "",
    variant = "default"
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: "default" | "operator" | "equals" | "function";
  }) => {
    const baseStyles = "flex items-center justify-center text-2xl font-medium rounded-2xl transition-all duration-150 active:scale-95 select-none cursor-pointer";
    const variants = {
      default: "bg-zinc-700 hover:bg-zinc-600 text-white",
      operator: "bg-amber-500 hover:bg-amber-400 text-white",
      equals: "bg-amber-500 hover:bg-amber-400 text-white",
      function: "bg-zinc-500 hover:bg-zinc-400 text-white",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-zinc-900 rounded-3xl p-4 shadow-2xl">
        {/* Display */}
        <div className="bg-zinc-800 rounded-2xl p-4 mb-4">
          <div className="text-right text-zinc-400 text-sm h-5 mb-1">
            {previousValue !== null && operator && `${previousValue} ${operator}`}
          </div>
          <div
            className="text-right text-white font-light overflow-hidden"
            style={{
              fontSize: display.length > 12 ? "1.5rem" : display.length > 8 ? "2rem" : "3rem"
            }}
          >
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="function">C</Button>
          <Button onClick={toggleSign} variant="function">+/-</Button>
          <Button onClick={backspace} variant="function">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </Button>
          <Button onClick={() => performOperation("/")} variant="operator">/</Button>

          {/* Row 2 */}
          <Button onClick={() => inputDigit("7")}>7</Button>
          <Button onClick={() => inputDigit("8")}>8</Button>
          <Button onClick={() => inputDigit("9")}>9</Button>
          <Button onClick={() => performOperation("*")} variant="operator">x</Button>

          {/* Row 3 */}
          <Button onClick={() => inputDigit("4")}>4</Button>
          <Button onClick={() => inputDigit("5")}>5</Button>
          <Button onClick={() => inputDigit("6")}>6</Button>
          <Button onClick={() => performOperation("-")} variant="operator">-</Button>

          {/* Row 4 */}
          <Button onClick={() => inputDigit("1")}>1</Button>
          <Button onClick={() => inputDigit("2")}>2</Button>
          <Button onClick={() => inputDigit("3")}>3</Button>
          <Button onClick={() => performOperation("+")} variant="operator">+</Button>

          {/* Row 5 */}
          <Button onClick={() => inputDigit("0")} className="col-span-2">0</Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={equals} variant="equals">=</Button>
        </div>

        {/* Keyboard hints */}
        <div className="mt-4 text-center text-zinc-500 text-xs">
          Keyboard: 0-9, +, -, *, /, Enter, Backspace, Esc
        </div>
      </div>
    </div>
  );
}
