import { Checkbox, Input, Text, Box } from "zmp-ui";
import { XLg } from "react-bootstrap-icons";

const QuestionMakerConstructedResponse = ({question, setQuestion, error, setError}) => {
  const { TextArea } = Input;
  const addAnswerKey = () => setQuestion({...question, answerKeys: [...question.answerKeys, ""]});

  const handleAnswerKey = (index: number, value: string) => {
    const newAnswerKey = question.answerKeys;
    newAnswerKey[index] = value;
    setQuestion({...question, answerKeys: newAnswerKey});
  }

  const deleteAnswerKey = (index: number) => {
    const newAnswerKey = question.answerKeys;
    newAnswerKey.splice(index, 1);
    setQuestion({...question, answerKeys: newAnswerKey});
  }

  return (
    <>
      <Box>
        <Box className="flex my-2 items-center">
          <Text className="flex-1">Đáp án</Text>
          <button
            className="zaui-bg-blue-80 text-white rounded-full py-1 px-4"
            onClick={() => addAnswerKey()}
          >
            Thêm đáp án mới
          </button>
        </Box>

        {
          question.answerKeys.map((ak, i) =>
            <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 flex items-center gap-x-2" key={i}>
              <Input placeholder="Nhập đáp án" value={ak} onChange={e => handleAnswerKey(i, e.target.value)} />
              <XLg onClick={() => deleteAnswerKey(i)} size={24} />
            </Box>
          )
        }
      </Box>

      <TextArea
        label={<Text className="mt-2">Lời giải/Giải thích <span className="required">*</span></Text>}
        placeholder="Lời giải/Giải thích" required value={question.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
        onBlur={() => setError({...error, explanation: ""})}
        errorText={error.explanation} status={!error.explanation ? "" : "error"}
      />

      <Checkbox className="mt-2 w-full" value="" checked={question.allowEnter} onChange={e => setQuestion({...question, allowEnter: e.target.checked})}>
        <Text>Cho phép học sinh xuống dòng.</Text>
      </Checkbox>
      <Checkbox className="mt-2" value="" checked={question.markAsWrong} onChange={e => setQuestion({...question, markAsWrong: e.target.checked})}>
        <Text>Đánh dấu các câu trả lời không khớp với nhóm đáp án là sai.</Text>
      </Checkbox>
    </>
  )
}

export { QuestionMakerConstructedResponse }