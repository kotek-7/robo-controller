import { Animator } from "@arwes/react";
import Section from "../../components/Section";
import SubSection from "../../components/SubSection";
import { PidFields as PidFieldsType } from "./types/pidFields";
import PidFields from "./PidFields";

export default function PidFieldsList(props: {pidFields: Array<PidFieldsType>}) {
  return (
    <Section title="M3508 PID fields">
      <Animator
        duration={{ stagger: 0.1 }}
        manager="stagger"
        combine
      >
        <div className="flex flex-col gap-6">
          <SubSection title="C620 ID: 1">
            <PidFields
              p={props.pidFields[0].p}
              i={props.pidFields[0].i}
              d={props.pidFields[0].d}
              output={props.pidFields[0].output}
              targetRpm={props.pidFields[0].targetRpm}
              error={props.pidFields[0].error}
            />
          </SubSection>
          <SubSection title="C620 ID: 2">
            <PidFields
              p={props.pidFields[1].p}
              i={props.pidFields[1].i}
              d={props.pidFields[1].d}
              output={props.pidFields[1].output}
              targetRpm={props.pidFields[1].targetRpm}
              error={props.pidFields[1].error}
            />
          </SubSection>
          <SubSection title="C620 ID: 3">
            <PidFields
              p={props.pidFields[2].p}
              i={props.pidFields[2].i}
              d={props.pidFields[2].d}
              output={props.pidFields[2].output}
              targetRpm={props.pidFields[2].targetRpm}
              error={props.pidFields[2].error}
            />
          </SubSection>
          <SubSection title="C620 ID: 4">
            <PidFields
              p={props.pidFields[3].p}
              i={props.pidFields[3].i}
              d={props.pidFields[3].d}
              output={props.pidFields[3].output}
              targetRpm={props.pidFields[3].targetRpm}
              error={props.pidFields[3].error}
            />
          </SubSection>
        </div>
      </Animator>
    </Section>
  );
}
