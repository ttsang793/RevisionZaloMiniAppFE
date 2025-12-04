import axios from "axios";
import { Input, Text, Box, Icon } from "zmp-ui";
import { useState } from "react";

const QuestionMakerShortAnswer = ({question, setQuestion, error, setError}) => {
  const { TextArea } = Input;
  let [number, setNumber] = useState(["", "", "", ""]);

  const handleNumber = (value: string, index: number) => {
    const newNumber = [...number];
    newNumber[index] = value;
    setNumber(newNumber);
    setQuestion({...question, answerKey: newNumber.join("")});
  }

  return (
    <>
      <Box>
        <Text className="my-2">Đáp án <span className="required">*</span></Text>
        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2">
          {number.map((n, i) => (
            <input
              className="size-8 text-center border border-gray-400 rounded-lg me-2"
              maxLength={1} key={i} value={n} onChange={e => handleNumber(e.target.value, i)}
              onBlur={() => setError({...error, answer: ""})}
            />
          ))}
        </Box>
        <Text className="error mt-1">
          {!error.answer ? <></> : <><Icon icon="zi-warning-solid" />{error.answer}</> }
        </Text>
      </Box>

      <TextArea
        label={<Text className="mt-2">Lời giải/Giải thích</Text>}
        placeholder="Lời giải/Giải thích" value={question.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
      />
    </>
  )
}

export { QuestionMakerShortAnswer }