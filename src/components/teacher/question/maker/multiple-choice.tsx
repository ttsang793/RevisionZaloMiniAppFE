import axios from "axios";
import { Box, Input, Radio, Select, Text, useNavigate } from "zmp-ui";
import { FormEvent, useState, useEffect } from "react";
import { Topic } from "@/models/topic";

import { MultipleChoiceQuestion } from "@/models/question";
import { insertMultipleChoiceQuestion } from "@/models/multiple-choice-question";
import "./multiple-choice.css";

// integrate image later

const QuestionMakerMutipleChoice = () => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<MultipleChoiceQuestion>(new MultipleChoiceQuestion());
  const navTo = useNavigate();

  useEffect(() => {
    axios.get("/api/topic").then(response => setTopicList(response.data));
  }, [])

  return (
    <form id="multiple-choice-question-maker" noValidate onSubmit={handleSubmit}>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

      <Box>
        <Text className="my-2">Đáp án <span className="required">*</span></Text>
        <Radio.Group name="answer" className="w-full" value={question?.answerKey}>
          <Radio value="A" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 1 *" required value={question?.answerA} onChange={e => setQuestion({...question, answerA: e.target.value})} />
          </Radio>
          <Radio value="B" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 2 *" required value={question?.answerB} onChange={e => setQuestion({...question, answerB: e.target.value})} />
          </Radio>
          <Radio value="C" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 3 *" required value={question?.answerC} onChange={e => setQuestion({...question, answerC: e.target.value})} />
          </Radio>
          <Radio value="D" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 4 *" required value={question?.answerD} onChange={e => setQuestion({...question, answerD: e.target.value})} />
          </Radio>
        </Radio.Group>
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
        value="Trắc nghiệm 4 đáp án" disabled
      />

      <Select
        label={<Text className="mt-2">Độ khó <span className="required">*</span></Text>}
        defaultValue={-1} closeOnSelect
        onChange={(e: number) => setQuestion({...question, difficulty: e})}
      >
        <Select.Option value={-1} title="Độ khó" disabled />
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
    question.type = 1;
    
    insertMultipleChoiceQuestion(question);
  }
}

export { QuestionMakerMutipleChoice }