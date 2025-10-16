import axios from "axios";
import { Input, Select, Text, Checkbox, Box, Icon, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { XLg } from "react-bootstrap-icons";
import { Topic } from "@/models/topic";

import { FillInTheBlankQuestion } from "@/models/question";
import { FillInTheBlankError, getFillInTheBlankQuestionById, insertFillInTheBlankQuestion, updateFillInTheBlankQuestion } from "@/models/fill-in-the-blank-question";

const QuestionMakerFillInTheBlank = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<FillInTheBlankQuestion>(new FillInTheBlankQuestion());
  const [error, setError] = useState<FillInTheBlankError>({});
  const navTo = useNavigate();

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

  useEffect(() => {
    if (id !== undefined) getFillInTheBlankQuestionById(id).then(response => setQuestion(response.data));
    axios.get("/api/topic").then(response => setTopicList(response.data));
  }, [])

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
      />

      <Box>
        <Box className="flex my-2 items-center">
          <Text className="flex-1">Đáp án <span className="required">*</span></Text>
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
              <Input
                placeholder="Nhập đáp án*" value={ak}
                onChange={e => handleAnswerKey(i, e.target.value)}
                onBlur={() => setError({...error, answer: ""})}
              />
              <XLg onClick={() => deleteAnswerKey(i)} size={24} />
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

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Điền vào chỗ trống" disabled />

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
        placeholder="Lời giải/Giải thích" value={question?.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
      />

      <Text className="required text-left italic my-2" bold>
        *: Các trường bắt buộc
      </Text>
      
      <Checkbox className="mt-2" value="" checked={question.markAsWrong} onChange={e => setQuestion({...question, markAsWrong: e.target.checked})}>
        <Text>Đánh dấu các câu trả lời không khớp với nhóm đáp án là sai.</Text>
      </Checkbox>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
        <input type="reset" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  function handleSubmit(): void {
    const newError: FillInTheBlankError = {};

    for (let i: number = 0; i < question.answerKeys.length; i++) {
      if (!question.answerKeys[i]) {
        newError.answer = "Vui lòng nhập đầy đủ (các) đáp án!";
        break;
      }
    }
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'fill-in-the-blank';
      (id === undefined) ? insertFillInTheBlankQuestion(question) : updateFillInTheBlankQuestion(question, id);
    }
  }
}

export { QuestionMakerFillInTheBlank }