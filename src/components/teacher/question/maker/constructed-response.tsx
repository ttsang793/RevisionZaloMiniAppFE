import axios from "axios";
import { Checkbox, Input, Select, Text, Box, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { XLg } from "react-bootstrap-icons";
import { Topic } from "@/models/topic";

import { ConstructedResponseQuestion } from "@/models/question";
import { ConstructedResponseError, getConstructedResponseQuestionById, insertConstructedResponseQuestion, updateConstructedResponseQuestion } from "@/models/constructed-response-question";

const QuestionMakerConstructedResponse = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<ConstructedResponseQuestion>(new ConstructedResponseQuestion());
  const [error, setError] = useState<ConstructedResponseError>({});
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
    if (id !== undefined) getConstructedResponseQuestionById(id).then(response => setQuestion(response.data));
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

      <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value="Tự luận" disabled />

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
        label={<Text className="mt-2">Lời giải/Giải thích <span className="required">*</span></Text>}
        placeholder="Lời giải/Giải thích" required value={question.explanation}
        onChange={e => setQuestion({...question, explanation: e.target.value})}
        onBlur={() => setError({...error, explanation: ""})}
        errorText={error.explanation} status={!error.explanation ? "" : "error"}
      />

      <Text className="required text-left italic my-2" bold>
        *: Các trường bắt buộc
      </Text>

      <Checkbox className="mt-2 w-full" value="" checked={question.allowTakePhoto} onChange={e => setQuestion({...question, allowTakePhoto: e.target.checked})}>
        <Text>Cho phép học sinh chụp ảnh trình bày câu trả lời.</Text>
      </Checkbox>
      <Checkbox className="mt-2 w-full" value="" checked={question.allowEnter} onChange={e => setQuestion({...question, allowEnter: e.target.checked})}>
        <Text>Cho phép học sinh xuống dòng.</Text>
      </Checkbox>
      <Checkbox className="mt-2" value="" checked={question.markAsWrong} onChange={e => setQuestion({...question, markAsWrong: e.target.checked})}>
        <Text>Đánh dấu các câu trả lời không khớp với nhóm đáp án là sai.</Text>
      </Checkbox>

      <Box className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </Box>
    </form>
  )

  function handleSubmit(): void {
    const newError: ConstructedResponseError = {};
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";
    if (!question.explanation) newError.explanation = "Vui lòng nhập lời giải thích!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'constructed-response';
      (id === undefined) ? insertConstructedResponseQuestion(question) : updateConstructedResponseQuestion(question, id);
    }
  }
}

export { QuestionMakerConstructedResponse }