import axios from "axios";
import { Input, Select, Text, Box, Icon, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { XLg } from "react-bootstrap-icons";
import { Topic } from "@/models/topic";

import { SortingQuestion } from "@/models/question";
import { getSortingQuestionById, insertSortingQuestion, SortingError, updateSortingQuestion } from "@/models/sorting-question";

const QuestionMakerSorting = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<SortingQuestion>(new SortingQuestion());
  const [error, setError] = useState<SortingError>({});
  const navTo = useNavigate();

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

  useEffect(() => {
    if (id !== undefined) getSortingQuestionById(id).then(response => {
      setQuestion(response.data);
    });
    axios.get("/api/topic").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi</Text>} placeholder="Tiêu đề câu hỏi" value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

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

      <Select
        label={<Text className="mt-2">Lớp <span className="required">*</span></Text>}
        value={question?.grade} closeOnSelect
        onChange={(e: number) => {
          setQuestion({...question, grade: e});
          setError({...error, grade: ""})
        }}
        errorText={error.grade} status={!error.grade ? "" : "error"}
      >
        <Select.Option value={-1} title="Lớp" disabled />
        <Select.Option value={6} title="Lớp 6" />
        <Select.Option value={7} title="Lớp 7" />
        <Select.Option value={8} title="Lớp 8" />
        <Select.Option value={9} title="Lớp 9" />
        <Select.Option value={10} title="Lớp 10" />
        <Select.Option value={11} title="Lớp 11" />
        <Select.Option value={12} title="Lớp 12" />
      </Select>

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Sắp xếp" disabled />

      <Select
        label={<Text className="mt-2">Độ khó <span className="required">*</span></Text>}
        closeOnSelect value={question.difficulty}
        onChange={(e: number) => {
          setQuestion({...question, difficulty: e});
          setError({...error, difficulty: ""});
        }}
        errorText={error.difficulty} status={!error.difficulty ? "" : "error"}
      >
        <Select.Option value={-1} title="Độ khó" disabled />
        <Select.Option value={1} title="Nhận biết" />
        <Select.Option value={2} title="Thông hiểu" />
        <Select.Option value={3} title="Vận dụng thấp" />
        <Select.Option value={4} title="Vận dụng cao" />
      </Select>

      <Select
        label={<Text className="mt-2">Chủ đề <span className="required">*</span></Text>}
        closeOnSelect value={question.topicId}
        onChange={(e: string) => {
          setQuestion({...question, topicId: e});
          setError({...error, topic: ""});
        }}
        errorText={error.topic} status={!error.topic ? "" : "error"}
      >
        <Select.Option value="-1" title="Chủ đề" disabled />
        {
          topicList.map((topic: Topic) =>
            <Select.Option key={topic.id} value={topic.id} title={topic.name} />
          )
        }
      </Select>

      <TextArea
        label={<Text className="mt-2">Lời giải/Giải thích</Text>}
        placeholder="Lời giải/Giải thích" value={question.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
      />

      <Text className="zaui-text-red-50 text-left italic my-2" bold>
        *: Các trường bắt buộc
      </Text>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  function handleSubmit(): void {
    const newError: SortingError = {};
    for (let i: number = 0; i < question.correctOrder.length; i++) {
      if (!question.correctOrder[i]) {
        newError.answer = "Vui lòng nhập đầy đủ (các) đáp án!";
        break;
      }
    }
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'sorting';
      (id === undefined) ? insertSortingQuestion(question) : updateSortingQuestion(question, id);
    }
  }
}

export { QuestionMakerSorting }