import { useState } from "react";
import { Box, Input, Text, Sheet } from "zmp-ui";
import { ChevronDown, ChevronUp, XLg } from "react-bootstrap-icons";
import { ExamGroupQuestion } from "./exam-question";
import { questionType } from "@/models/question";

interface ExamPartProps {
  i: number;
  grade: number;
  partTitle: string;
  questionList: any[];
  updatePartTitle: (i: number, value: string) => void;
  updateQuestionList: (i: number, value: any[]) => void;
  deletePart: (i: number) => void;
}

const ExamPart = ({
  i,
  grade,
  partTitle,
  questionList,
  updatePartTitle,
  updateQuestionList,
  deletePart
}: ExamPartProps) => {
  const [showDetail, setShowDetail] = useState(true);
  const [selectModal, setSelectModal] = useState(false);

  function addQuestion(type) {
    let newList;
    if (type === "true-false-thpt") newList = [...questionList, { point: 1, id: [], type }];
    else newList = [...questionList, { point: 0, id: [], type }];
    updateQuestionList(i, newList);
  }

  function deleteQuestion(qIndex: number) {
    const newList = questionList.filter((_, index) => index !== qIndex);
    updateQuestionList(i, newList);
  }

  function updateQuestion(qIndex: number, updated: any) {
    const newList = [...questionList];
    newList[qIndex] = updated;
    updateQuestionList(i, newList);
  }

  return (
    <Box className="mb-4 border-b pb-2 zaui-border-blue-80 bg-white">
      <Box className="zaui-bg-blue-80 text-white p-2 ps-4 w-full flex gap-x-1 items-center justify-between font-bold">
        <Box className="flex-1">Phần {i + 1}.</Box>
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <button onClick={() => deletePart(i)}>
          <XLg size={20} />
        </button>
      </Box>

      {showDetail && (
        <Box className="p-2 text-sm zaui-bg-steelblue-20">
          <Input
            label={<Text>Tiêu đề <span className="required">*</span></Text>}
            placeholder="Tiêu đề"
            value={partTitle}
            onChange={e => updatePartTitle(i, e.target.value)}
          />
        </Box>
      )}

      <Box className="mb-2">
        {questionList.length === 0 ? (
          <Text className="mt-2 text-center italic">Chưa có câu hỏi nào!</Text>
        ) : (
          questionList.map((q, index) => (
            <ExamGroupQuestion
              key={index}
              grade={grade}
              numQuestion={index}
              data={q}
              updateQuestion={updated => updateQuestion(index, updated)}
              deleteQuestion={deleteQuestion}
            />
          ))
        )}
      </Box>

      <Box className="text-right">
        <button
          className="zaui-bg-blue-80 text-white rounded-full py-1 px-4 me-4 text-center"
          onClick={() => setSelectModal(true)}
        >
          Thêm câu hỏi mới
        </button>
      </Box>

      <AddQuestionSheet visible={selectModal} setVisible={setSelectModal} addQuestion={addQuestion} />
    </Box>
  );
};

const AddQuestionSheet = ({visible, setVisible, addQuestion}: {visible: boolean, setVisible: (status: boolean) => void, addQuestion: (type: string) => void}) => {
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

export { ExamPart };