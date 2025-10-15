import { useState, useEffect } from "react";
import { Box, Input, Select, Text, useNavigate } from "zmp-ui";

import { getQuestionsFilterByTeacher, Question } from "@/models/question";
import { GroupQuestion, getGroupQuestionById, insertGroupQuestion, updateGroupQuestion } from "@/models/group-question";
import SelectQuestion from "../../select-question";

const QuestionMakerGroup = ({id}) => {
  const { TextArea } = Input;
  const [question, setQuestion] = useState<GroupQuestion>(new GroupQuestion());
  const [filterQuestion, setFilterQuestion] = useState<Question[]>([]);
  let [selectQuestion, setSelectQuestion] = useState<Question[]>([]);
  const [selectionModal, setSelectionModal] = useState(true);
  const navTo = useNavigate();

  const handleQuestion = (value: boolean, question: Question) => {
    if (value) setSelectQuestion(prev => [...prev, question]);
    else setSelectQuestion(prev => prev.filter(q => q.id !== question.id));
  }

  useEffect(() => {
    if (id !== undefined) getGroupQuestionById(Number(id)).then(response => setQuestion(response.data));
    getQuestionsFilterByTeacher().then(response => setFilterQuestion(response.data))
  }, []);

  return (
    <form onSubmit={e => e.preventDefault()} noValidate>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required value={question?.title}
        onChange={e => setQuestion({...question, title: e.target.value})}
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

      <Box>
        <Text className="my-2">Danh sách câu hỏi <span className="zaui-text-red-50">*</span></Text>

        <Box className="mb-3">
          <Input
            placeholder="Nhập tiêu đề của câu hỏi"
            className="mb-0"
          />

          <Box className="border zaui-border-gray-30 min-h-0 max-h-40 overflow-auto divide-y">
          {
            filterQuestion.map((q, i) => <SelectQuestion question={q} filter handleQuestion={handleQuestion} key={`filter-${i}`} />)
          }
          </Box>
        </Box>

        {
          selectQuestion.map((q, i) => <SelectQuestion question={q} handleQuestion={() => {}} key={`select-${i}`} />)
        }
      </Box>

      <Box className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={handleSubmit} />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </Box>
    </form>
  )

  function handleSubmit() {
    selectQuestion.forEach(q => question.questions.push(q.id!));
    id === undefined ? insertGroupQuestion(question) : updateGroupQuestion(question, id);
  }
}

export { QuestionMakerGroup }