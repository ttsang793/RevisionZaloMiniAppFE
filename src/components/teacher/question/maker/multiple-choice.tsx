import { Box, Input, Icon, Text } from "zmp-ui";

const QuestionMakerMutipleChoice = ({question, setQuestion, error, setError}) => {
  const { TextArea } = Input;

  const handleWrongAnswerChange = (val: string, index: number) => {
    const newWrongAnswer = [...question.wrongAnswer];
    newWrongAnswer[index] = val;
    setQuestion({...question, wrongAnswer: newWrongAnswer})
  }

  const handleWrongAnswerErrorChange = () => {
    let wrongAnswer = ""
    for (let i: number = 0; i < 2; i++) {
      if (!question.wrongAnswer[i]) {
        wrongAnswer = "Vui lòng nhập đầy đủ các câu trả lời sai!";
        break;
      }
    }

    setError({...error, wrongAnswer})
  }

  return (
    <>
      <Box>
        <Text className="my-2">Đáp án đúng <span className="required">*</span></Text>        
        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2">
          <Input
            placeholder="Nhập đáp án đúng*" required value={question?.correctAnswer}
            onChange={e => setQuestion({...question, correctAnswer: e.target.value})}
            onBlur={() => setError({...error, correctAnswer: ""})}
            errorText={error.correctAnswer}
            status={!error.correctAnswer ? "" : "error"}
          />
        </Box>
      </Box>

      <Box>
        <Text className="my-2">Ba đáp án sai <span className="required">*</span></Text>
        {
          [0,1,2].map(i => 
            <Box
              key={`wrong-${i}`}
              className={`border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2 ${i > 0 ? "border-t-0" : ""}`}
            >
              <Input
                placeholder={`Nhập đáp án sai ${i + 1}*`} required value={question?.wrongAnswer[i]}
                onChange={e => handleWrongAnswerChange(e.target.value, i)}
                onBlur={() => handleWrongAnswerErrorChange()}
              />
            </Box>
          )
        }
        <Text className="error mt-1">
          {!error.wrongAnswer ? <></> : <><Icon icon="zi-warning-solid" />{error.wrongAnswer}</> }
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

export { QuestionMakerMutipleChoice }