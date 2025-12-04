import { Box, Input, Text, Checkbox, Icon } from "zmp-ui";
import "./radio-checkbox.css";

const QuestionMakerTrueFalseTHPT = ({question, setQuestion, error, setError}) => {
  const { TextArea } = Input;

  const handleChangeAnswerKeys = (i: number, value: boolean) => {
    const newAnswerKeys = question.answerKeys;
    newAnswerKeys[i] = value;
    setQuestion({...question, answerKeys: newAnswerKeys});
  }

  const handleChangeStatements = (i: number, value: string) => {
    const newStatements = question.statements;
    newStatements[i] = value;
    setQuestion({...question, statements: newStatements});
  }

  return (
    <>
      <Input
        label={<Text className="mt-2">Tiêu đề đoạn văn (trích đoạn)</Text>}
        placeholder="Tiêu đề đoạn văn" value={question?.passageTitle}
        onChange={e => setQuestion({...question, passageTitle: e.target.value})}
      />

      <TextArea
        label={<Text className="mt-2">Nội dung đoạn văn</Text>}
        placeholder="Nội dung đoạn văn" value={question?.passageContent}
        onChange={e => setQuestion({...question, passageContent: e.target.value})}
      />

      <Input
        label={<Text className="mt-2">Tác giả và nguồn của đoạn văn</Text>}
        placeholder="Tác giả và nguồn của đoạn văn" value={question?.passageAuthor}
        onChange={e => setQuestion({...question, passageAuthor: e.target.value})}
      />

      <Box id="checkbox-answer">
        <Text className="my-2">Danh sách mệnh đề <span className="required">*</span></Text>
        
        {
          [0, 1, 2, 3].map(i =>
            <Checkbox
              className="zaui-border-gray-30 zaui-bg-steelblue-20"
              value="" checked={question.answerKeys[i]}
              onChange={e => handleChangeAnswerKeys(i, e.target.checked)}
              key={`checkbox-${i + 1}`}
            >
              <Input
                placeholder={`Mệnh đề ${i + 1}`} value={question.statements[i]}
                onChange={e => handleChangeStatements(i, e.target.value)}
                onBlur={() => setError({...error, statement: ""})}
              />
            </Checkbox>
          )
        }
        <Text className="error mt-1">
          {!error.statement ? <></> : <><Icon icon="zi-warning-solid" />{error.statement}</> }
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

export { QuestionMakerTrueFalseTHPT }