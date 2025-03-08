import { useState } from "react";

export function usePidFields() {
  const [m35081PidFields, setM35081PidFields] = useState({
    output: 0,
    p: 0,
    i: 0,
    d: 0,
    targetRpm: 0,
    error: 0,
  });
  const [m35082PidFields, setM35082PidFields] = useState({
    output: 0,
    p: 0,
    i: 0,
    d: 0,
    targetRpm: 0,
    error: 0,
  });
  const [m35083PidFields, setM35083PidFields] = useState({
    output: 0,
    p: 0,
    i: 0,
    d: 0,
    targetRpm: 0,
    error: 0,
  });
  const [m35084PidFields, setM35084PidFields] = useState({
    output: 0,
    p: 0,
    i: 0,
    d: 0,
    targetRpm: 0,
    error: 0,
  });

  return {
    m35081PidFields,
    setM35081PidFields,
    m35082PidFields,
    setM35082PidFields,
    m35083PidFields,
    setM35083PidFields,
    m35084PidFields,
    setM35084PidFields,
  }
}