import { Box, Input, Radio, Text } from "zmp-ui";
import "./radio-checkbox.css"

const QuestionMakerTrueFalse = ({question, setQuestion}) => {
  const { TextArea } = Input;

  return (
    <>
      <Box id="radio-answer">
        <Text className="my-2">Đáp án <span className="required">*</span></Text>
        
        <Radio
          checked={question.answerKey === true}
          value="true"
          className="zaui-border-gray-30 zaui-bg-steelblue-20"
          onChange={() => setQuestion({ ...question, answerKey: true })}
        >
          <Input value="Đúng" readOnly />
        </Radio>
        <Radio
          checked={question.answerKey === false}
          value="true"
          className="zaui-border-gray-30 zaui-bg-steelblue-20"
          onChange={() => setQuestion({ ...question, answerKey: false })}
        >
          <Input value="Sai" readOnly />
        </Radio>
      </Box>

      <TextArea
        label={<Text className="mt-2">Lời giải/Giải thích</Text>}
        placeholder="Lời giải/Giải thích" value={question.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
      />
    </>
  )
}

export { QuestionMakerTrueFalse }