import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Input, Select, Text, Checkbox, Icon, useNavigate } from "zmp-ui";
import { Topic } from "@/models/topic";
import "./radio-checkbox.css";

import { TrueFalseTHPTQuestion } from "@/models/question";
import { TrueFalseTHPTError, getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion } from "@/models/true-false-thpt-question";

const QuestionMakerTrueFalseTHPT = ({id}) => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const [question, setQuestion] = useState<TrueFalseTHPTQuestion>(new TrueFalseTHPTQuestion());
  const [error, setError] = useState<TrueFalseTHPTError>({});
  const navTo = useNavigate();

  const handleChangeAnswerKeys = (i: number, value: boolean) => {
    const newAnswerKeys = question.answerKeys;
    newAnswerKeys[i] = value;
    setQuestion({...question, answerKeys: newAnswerKeys});
  }

  const handleChangeStatements = (i: number, value: string) => {
    const newStatements = question.statements;
    newStatements[i] = value;
    setQuestion({...question, statements: newStatements});
  }

  useEffect(() => {
    if (id !== undefined) getTrueFalseTHPTQuestionById(Number(id)).then(response => setQuestion(response.data));
    axios.get("/api/topic").then(response => setTopicList(response.data));
  }, []);

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
        onBlur={() => setError({...error, title: ""})}
        errorText={error.title} status={!error.title ? "" : "error"}        
      />

      <Box>
        <label>
          <Text className="mt-2">Hình ảnh minh họa</Text>
        </label>
        <input
          type="file"
          className="p-4 border zaui-border-gray-30 rounded-lg w-full text-center mt-2"
          accept="image/png, image/jpeg"
        />
      </Box>

      <Input
        label={<Text className="mt-2">Tiêu đề đoạn văn (trích đoạn)</Text>}
        placeholder="Tiêu đề đoạn văn" value={question?.passageTitle}
        onChange={e => setQuestion({...question, passageTitle: e.target.value})}
      />

      <TextArea
        label={<Text className="mt-2">Nội dung đoạn văn</Text>}
        placeholder="Nội dung đoạn văn" value={question?.passageContent}
        onChange={e => setQuestion({...question, passageContent: e.target.value})}
      />

      <Input
        label={<Text className="mt-2">Tác giả và nguồn của đoạn văn</Text>}
        placeholder="Tác giả và nguồn của đoạn văn" value={question?.passageAuthor}
        onChange={e => setQuestion({...question, passageAuthor: e.target.value})}
      />

      <Box id="checkbox-answer">
        <Text className="my-2">Danh sách mệnh đề <span className="required">*</span></Text>
        
        {
          [0, 1, 2, 3].map(i =>
            <Checkbox
              className="zaui-border-gray-30 zaui-bg-steelblue-20"
              value="" checked={question.answerKeys[i]}
              onChange={e => handleChangeAnswerKeys(i, e.target.checked)}
              key={`checkbox-${i + 1}`}
            >
              <Input
                placeholder={`Mệnh đề ${i + 1}`} value={question.statements[i]}
                onChange={e => handleChangeStatements(i, e.target.value)}
                onBlur={() => setError({...error, statement: ""})}
              />
            </Checkbox>
          )
        }
        <Text className="error mt-1">
          {!error.statement ? <></> : <><Icon icon="zi-warning-solid" />{error.statement}</> }
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
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={handleSubmit} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )

  function handleSubmit(): void {
    const newError: TrueFalseTHPTError = {};
    if (!question.title) newError.title = "Vui lòng nhập tiêu đề câu hỏi!";
    for (let i: number = 0; i < question.statements.length; i++) {
      if (!question.statements[i]) {
        newError.statement = "Vui lòng nhập đầy đủ 4 mệnh đề!";
        break;
      }
    }
    if (question.grade === -1) newError.grade = "Vui lòng chọn lớp!";
    if (question.difficulty === -1) newError.difficulty = "Vui lòng chọn độ khó!";
    if (question.topicId === "-1") newError.topic = "Vui lòng chọn chủ đề!";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      question.type = 'true-false-thpt';
      (id === undefined) ? insertTrueFalseTHPTQuestion(question) : updateTrueFalseTHPTQuestion(question, id);
    }
  }
}

export { QuestionMakerTrueFalseTHPT }