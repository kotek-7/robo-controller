import { Animator } from "@arwes/react";
import Section from "../../components/Section";
import SubSection from "../../components/SubSection";
import Feedbacks from "./Feedbacks";
import { Feedback } from "./types/feedbacks";

export default function FeedbacksList(props: { feedbacks: Feedback[] }) {
  return (
    <Section title="M3508 feedbacks">
      <Animator
        duration={{ stagger: 0.1 }}
        manager="stagger"
        combine
      >
        <div className="flex flex-col gap-4">
          {props.feedbacks.map((feedback, index) => (
            <SubSection
              key={index}
              title={`C620 ID: ${index + 1}`}
              indent
            >
              <Feedbacks
                angle={feedback.angle}
                rpm={feedback.rpm}
                amp={feedback.amp}
                temp={feedback.temp}
              />
            </SubSection>
          ))}
        </div>
      </Animator>
    </Section>
  );
}
