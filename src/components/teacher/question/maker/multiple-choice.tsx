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
  const [error, setError] = useState<MultipleChoiceError>(new MultipleChoiceError());
  const navTo = useNavigate();

  const handleWrongAnswerChange = (val: string, index: number) => {
    const newWrongAnswer = [...question.wrongAnswer];
    newWrongAnswer[index] = val;
    setQuestion({...question, wrongAnswer: newWrongAnswer})
  }

  const handleWrongAnswerErrorChange = (index: number) => {
    const newError = [...error.wrongAnswer];
    newError[index] = "";
    setQuestion({...question, wrongAnswer: newError})
  }

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
                placeholder="Nhập đáp án sai 1*" required value={question?.wrongAnswer[i]}
                onChange={e => handleWrongAnswerChange(e.target.value, i)}
                onBlur={() => handleWrongAnswerErrorChange(i)}
                errorText={error.wrongAnswer[i]}
                status={!error.wrongAnswer[i] ? "" : "error"}
              />
            </Box>
          )
        }
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
    let errorFlag = false;
    const newError: MultipleChoiceError = new MultipleChoiceError();
    if (question.correctAnswer === "") { newError.correctAnswer = "Vui lòng nhập đáp án!"; errorFlag = true; }
    for (let i = 0; i < 2; i++)
      if (question.wrongAnswer[i] === "") { newError.wrongAnswer[i] = "Vui lòng nhập câu trả lời sai!"; errorFlag = true; }
    if (question.grade === -1) { newError.grade = "Vui lòng chọn lớp!"; errorFlag = true; }
    if (question.difficulty === -1) { newError.difficulty = "Vui lòng chọn độ khó!"; errorFlag = true; }
    if (question.topicId === "-1") { newError.topic = "Vui lòng chọn chủ đề!"; errorFlag = true; }

    setError(newError);

    if (!errorFlag) {
      question.type = 'multiple-choice';    
      id === undefined ? insertMultipleChoiceQuestion(question) : updateMultipleChoiceQuestion(question, id);
    }
  }
}

export { QuestionMakerMutipleChoice }