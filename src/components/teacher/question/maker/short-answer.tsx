import axios from "axios";
import { Input, Select, Text, Box, useNavigate } from "zmp-ui";
import { FormEvent, useState, useEffect } from "react";
import { Topic } from "@/models/topic";

import { ShortAnswerQuestion } from "@/models/question";
import { getShortAnswerQuestionById, insertShortAnswerQuestion, updateShortAnswerQuestion } from "@/models/short-answer-question";

const QuestionMakerShortAnswer = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<ShortAnswerQuestion>(new ShortAnswerQuestion());
  let [number, setNumber] = useState(["", "", "", ""]);
  const navTo = useNavigate();

  const handleNumber = (value: string, index: number) => {
    const newNumber = [...number];
    newNumber[index] = value;
    setNumber(newNumber);
  }

  useEffect(() => {
    if (id !== undefined) getShortAnswerQuestionById(id).then(response => {
      setNumber(String(response.data).split(""));
      setQuestion(response.data);
    });
    axios.get("/api/topic").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

      <Box>
        <Text className="my-2">Đáp án <span className="required">*</span></Text>
        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2">
          {number.map((n, i) => (
            <input
              className="size-8 text-center border border-gray-400 rounded-lg me-2"
              maxLength={1} key={i} value={n} onChange={e => handleNumber(e.target.value, i)}
            />
          ))}
        </Box>
      </Box>

      <Select
        label={<Text className="mt-2">Lớp <span className="required">*</span></Text>}
        value={question?.grade} closeOnSelect
        onChange={(e: number) => setQuestion({...question, grade: e})}
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

      <Input
        label={<Text className="mt-2">Dạng câu hỏi</Text>}
        value="Trắc nghiệm trả lời ngắn" disabled
      />

      <Select
        label={<Text className="mt-2">Độ khó <span className="required">*</span></Text>}
        defaultValue={-1} closeOnSelect
        onChange={(e: number) => setQuestion({...question, difficulty: e})}
      >
        <Select.Option value={-1} title="Độ khó" disabled className="required" />
        <Select.Option value={1} title="Nhận biết" />
        <Select.Option value={2} title="Thông hiểu" />
        <Select.Option value={3} title="Vận dụng thấp" />
        <Select.Option value={4} title="Vận dụng cao" />
      </Select>

      <Select
        label={<Text className="mt-2">Chủ đề <span className="required">*</span></Text>}
        defaultValue="-1" closeOnSelect
        onChange={(e: string) => setQuestion({...question, topicId: e})}
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
        placeholder="Lời giải/Giải thích"
        onChange={e => setQuestion({...question, explaination: e.target.value})}
      />

      <Text className="required text-left italic mb-2" bold>
        *: Các trường bắt buộc
      </Text>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    question.type = 3;
    question.answerKey = Number(number.join(""));

    insertShortAnswerQuestion(question);
  }
}

export { QuestionMakerShortAnswer }