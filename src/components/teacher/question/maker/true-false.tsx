import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Input, Radio, Select, Text, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";
import { Topic } from "@/models/topic";

import { TrueFalseQuestion } from "@/models/question";
import { getTrueFalseQuestionById, insertTrueFalseQuestion, TrueFalseError, updateTrueFalseQuestion } from "@/models/true-false-question";
import "./radio-checkbox.css"

const QuestionMakerTrueFalse = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<TrueFalseQuestion>(new TrueFalseQuestion());
  const [error, setError] = useState<TrueFalseError>({});
  const navTo = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    if (id !== undefined) getTrueFalseQuestionById(id).then(response => setQuestion(response.data));
    axios.get("/api/topic/active").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
        onBlur={() => setError({...error, title: ""})}
        errorText={error.title} status={!error.title ? "" : "error"}  
      />

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

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Trắc nghiệm Đúng – Sai" disabled />

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

      <Text className="required text-left italic my-2" bold>
        *: Các trường bắt buộc
      </Text>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  async function handleSubmit(): Promise<void> {
    const newError: TrueFalseError = {};
    if (!question.title) newError.title = "Vui lòng nhập tiêu đề!";
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);
    if (Object.keys(newError).length > 0) return;

    question.type = 'true-false';
    const response = (!id) ? await insertTrueFalseQuestion(question) : await updateTrueFalseQuestion(question, id);
    if (response.status === 200 && response.status === 201) {
      openSnackbar({
        text: `${!id ? "Cập nhật" : "Thêm"} câu hỏi thành công!`,
        type: "success",
        duration: 1500
      });
      setTimeout(() => navTo("/teacher/question"), 1500);
    }
    else {
      openSnackbar({
        text: `${!id ? "Cập nhật" : "Thêm"} câu hỏi thất bại!`,
        type: "error"
      });
    }
  }
}

export { QuestionMakerTrueFalse }