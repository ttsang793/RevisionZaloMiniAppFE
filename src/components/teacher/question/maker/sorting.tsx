import { Input, Text, Box, Icon } from "zmp-ui";
import { XLg } from "react-bootstrap-icons";

const QuestionMakerSorting = ({question, setQuestion, error, setError}) => {
  const { TextArea } = Input;

  const addCorrectOrder = () => {
    if (question.correctOrder.length === 8) return;
    setQuestion({...question, correctOrder: [...question.correctOrder, ""]});
  }

  const handleCorrectOrder = (index: number, value: string) => {    
    const newCorrectOrder = question.correctOrder;
    newCorrectOrder[index] = value;
    setQuestion({...question, correctOrder: newCorrectOrder});
  }

  const deleteCorrectOrder = (index: number) => {
    if (question.correctOrder.length === 3) return;

    const newCorrectOrder = question.correctOrder;
    newCorrectOrder.splice(index, 1);
    setQuestion({...question, correctOrder: newCorrectOrder});
  }

  return (
    <>
      <Box>
        <Box className="flex my-2 items-center">
          <Text className="flex-1">Trình tự sắp xếp (3-8 câu) <span className="zaui-text-red-50">*</span></Text>
          <button
            className="zaui-bg-blue-80 text-white rounded-full py-1 px-6"
            onClick={addCorrectOrder}
          >
            Thêm câu mới
          </button>
        </Box>

        {
          question.correctOrder.map((ak, i) =>
            <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 flex items-center gap-x-2" key={i}>
              <span className="font-bold text-2xl">{i + 1}</span>
              <Input
                placeholder="Nhập đáp án" value={ak}
                onChange={e => handleCorrectOrder(i, e.target.value)}
                onBlur={() => setError({...error, answer: ""})}
              />
              <XLg onClick={() => deleteCorrectOrder(i)} size={24} />
            </Box>
          )
        }
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

export { QuestionMakerSorting }