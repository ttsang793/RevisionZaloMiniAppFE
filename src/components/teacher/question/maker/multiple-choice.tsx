import axios from "axios";
import { Box, Input, Select, Text, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { Topic } from "@/models/topic";

import { MultipleChoiceQuestion } from "@/models/question";
import { getMultipleChoiceQuestionById, insertMultipleChoiceQuestion, MultipleChoiceError, updateMultipleChoiceQuestion } from "@/models/multiple-choice-question";

// integrate image later

const QuestionMakerMutipleChoice = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<MultipleChoiceQuestion>(new MultipleChoiceQuestion());
  const [error, setError] = useState<MultipleChoiceError>({});
  const navTo = useNavigate();

  useEffect(() => {
    if (id !== undefined) getMultipleChoiceQuestionById(id).then(response => setQuestion(response.data));
    axios.get("/api/topic/active").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi</Text>} placeholder="Tiêu đề câu hỏi" value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

      <Box>
        <Text className="my-2">Đáp án đúng <span className="required">*</span></Text>        
        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2">
          <Input
            placeholder="Nhập đáp án đúng*" required value={question?.correctAnswer}
            onChange={e => setQuestion({...question, correctAnswer: e.target.value})}
            onBlur={e => setError({...error, correctAnswer: ""})}
            errorText={error.correctAnswer}
            status={!error.correctAnswer ? "" : "error"}
          />
        </Box>
      </Box>

      <Box>
        <Text className="my-2">Ba đáp án sai <span className="required">*</span></Text>
        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2">
          <Input
            placeholder="Nhập đáp án sai 1*" required value={question?.wrongAnswer1}
            onChange={e => setQuestion({...question, wrongAnswer1: e.target.value})}
            onBlur={e => setError({...error, wrongAnswer1: ""})}
            errorText={error.wrongAnswer1}
            status={!error.wrongAnswer1 ? "" : "error"}
          />
        </Box>
        <Box className="border border-t-0 zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2">
          <Input
            placeholder="Nhập đáp án sai 2*" required value={question?.wrongAnswer2}
            onChange={e => setQuestion({...question, wrongAnswer2: e.target.value})}
            onBlur={e => setError({...error, wrongAnswer2: ""})}
            errorText={error.wrongAnswer2}
            status={!error.wrongAnswer2 ? "" : "error"}
          />
        </Box>
        <Box className="border border-t-0 zaui-border-gray-40 zaui-bg-steelblue-20 p-2 items-center gap-x-2">
          <Input
            placeholder="Nhập đáp án sai 3*" required value={question?.wrongAnswer3}
            onChange={e => setQuestion({...question, wrongAnswer3: e.target.value})}
            onBlur={e => setError({...error, wrongAnswer3: ""})}
            errorText={error.wrongAnswer3}
            status={!error.wrongAnswer3 ? "" : "error"}
          />
        </Box>
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

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Trắc nghiệm 4 đáp án" disabled />

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

  function handleSubmit(): void {
    const newError: MultipleChoiceError = {};
    if (question.correctAnswer === "") newError.correctAnswer = "Vui lòng nhập đáp án!";
    if (question.wrongAnswer1 === "") newError.wrongAnswer1 = "Vui lòng nhập câu trả lời sai!";
    if (question.wrongAnswer2 === "") newError.wrongAnswer2 = "Vui lòng nhập câu trả lời sai!";
    if (question.wrongAnswer3 === "") newError.wrongAnswer3 = "Vui lòng nhập câu trả lời sai!";
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'multiple-choice';    
      id === undefined ? insertMultipleChoiceQuestion(question) : updateMultipleChoiceQuestion(question, id);
    }
  }
}

export { QuestionMakerMutipleChoice }