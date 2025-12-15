import { Box, Text, Sheet } from "zmp-ui";
import { PlusLg, XLg } from "react-bootstrap-icons";
import { useState } from "react";
import { PDFAnswer } from "./PDF-question";
import { ExamCodeQuestion } from "@/models/pdf-exam-code";

const questionType = [
 { title: "Trắc nghiệm 4 đáp án", type: "multiple-choice" },
 { title: "Trắc nghiệm Đúng – Sai", type: "true-false" },
 { title: "Trắc nghiệm trả lời ngắn", type: "short-answer" },
 { title: "Điền vào chỗ trống", type: "gap-fill" },
 { title: "Tự luận", type: "constructed-response" },
 { title: "Trắc nghiệm Đúng – Sai THPT", type: "true-false-thpt" },
];

interface PDFExamPartProps {
  partIndex: number;
  questions: ExamCodeQuestion[];
  addQuestion: (type: string) => void;
  updateQuestion: (partIndex: number, questionIndex: number, prop: string, value: any) => void;
  deleteQuestion: (partIndex: number, questionIndex: number) => void;
  deletePart: (j: number) => void;
}

const PDFExamPart = ({partIndex, questions, addQuestion, updateQuestion, deleteQuestion, deletePart}: PDFExamPartProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Box className="px-4 my-2">
      <Box className="flex justify-between items-center border-b border-b-black pb-1">
        <Text.Title size="normal" className="flex-1">Phần {partIndex + 1}</Text.Title>

        <button
          className="zaui-bg-blue-80 text-white rounded-full size-7 text-center me-1"
          onClick={() => setModalVisible(true)}
        >
          <PlusLg className="inline" size={20} />
        </button>

        <button
          className="zaui-bg-blue-80 text-white rounded-full size-7 text-center"
          onClick={() => deletePart(partIndex)}>
          <XLg className="inline" size={20} />
        </button>
      </Box>

      {
        questions.map((question, questionIndex) =>
          <PDFAnswer
            key={`q-${partIndex}_${questionIndex}`}
            question={question}
            partIndex={partIndex}
            questionIndex={questionIndex}
            updateQuestion={(prop: string, value: any) => updateQuestion(partIndex, questionIndex, prop, value)}
            deleteQuestion={deleteQuestion}
          />
        )
      }

      <AddQuestionSheet visible={modalVisible} setVisible={setModalVisible} addQuestion={addQuestion} />
    </Box>
  )
}

interface AddQuestionSheetProps {
  visible: boolean;
  setVisible: (status: boolean) => void;
  addQuestion: (type: string) => void
}

const AddQuestionSheet = ({visible, setVisible, addQuestion}: AddQuestionSheetProps) => {
  const handleSelect = (type: string) => {
    addQuestion(type);
    setVisible(false)
  }

  return (
    <Sheet
      title="Chọn dạng câu hỏi"
      visible={visible}
    >
      <ul className="zaui-border-gray-40 divide-y">
      {
        questionType.map(q => <li className="p-4 cursor-pointer" onClick={() => handleSelect(q.type)} key={q.type}>{q.title}</li>)
      }
      </ul>
    </Sheet>
  )
}

export { PDFExamPart }