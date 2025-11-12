import axios from "axios";
import { Input, Select, Text, Box, useNavigate, Icon } from "zmp-ui";
import { useState, useEffect } from "react";
import { Topic } from "@/models/topic";

import { ShortAnswerQuestion } from "@/models/question";
import { getShortAnswerQuestionById, insertShortAnswerQuestion, ShortAnswerError, updateShortAnswerQuestion } from "@/models/short-answer-question";

const QuestionMakerShortAnswer = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<ShortAnswerQuestion>(new ShortAnswerQuestion());
  const [error, setError] = useState<ShortAnswerError>({});
  let [number, setNumber] = useState(["", "", "", ""]);
  const navTo = useNavigate();

  const handleNumber = (value: string, index: number) => {
    const newNumber = [...number];
    newNumber[index] = value;
    setNumber(newNumber);
  }

  useEffect(() => {
    if (id !== undefined) getShortAnswerQuestionById(id).then(response => {
      let number = response.data.answerKey;
      while (number.length < 4) number += " ";      
      setNumber(number.split(""));
      setQuestion(response.data);
    });
    axios.get("/api/topic/active").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi</Text>} placeholder="Tiêu đề câu hỏi" value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

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

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Trắc nghiệm trả lời ngắn" disabled />

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

      <Text className="required text-left italic mb-2" bold>
        *: Các trường bắt buộc
      </Text>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={handleSubmit} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  function handleSubmit(): void {
    question.answerKey = number.join("");
    const newError: ShortAnswerError = {};
    if (!question.answerKey) newError.answer = "Vui lòng nhập đáp án!"
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'short-answer';
      (id === undefined) ? insertShortAnswerQuestion(question) : updateShortAnswerQuestion(question, id);
    }
  }
}

export { QuestionMakerShortAnswer }