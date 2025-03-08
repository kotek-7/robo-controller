import { useState } from "react";

export function useFeedbacks() {
  const [m35081Feedback, setM35081Feedback] = useState({
    angle: 0,
    rpm: 0,
    amp: 0,
    temp: 0,
  });
  const [m35082Feedback, setM35082Feedback] = useState({
    angle: 0,
    rpm: 0,
    amp: 0,
    temp: 0,
  });
  const [m35083Feedback, setM35083Feedback] = useState({
    angle: 0,
    rpm: 0,
    amp: 0,
    temp: 0,
  });
  const [m35084Feedback, setM35084Feedback] = useState({
    angle: 0,
    rpm: 0,
    amp: 0,
    temp: 0,
  });

  return {
    m35081Feedback,
    setM35081Feedback,
    m35082Feedback,
    setM35082Feedback,
    m35083Feedback,
    setM35083Feedback,
    m35084Feedback,
    setM35084Feedback,
  }
}