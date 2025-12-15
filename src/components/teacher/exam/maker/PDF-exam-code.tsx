import { useState } from "react";
import { Box, Text, useSnackbar } from "zmp-ui";
import { PDFExamPart } from "./PDF-exam-part";
import { ChevronDown, ChevronUp, XLg } from "react-bootstrap-icons";
import { ExamCode, ExamCodeQuestion } from "@/models/pdf-exam-code";

interface PDFExamCodeProps {
  i: number;
  examCode: ExamCode;
  updateExamCode: (i: number, value: ExamCode) => void;
  deleteExamCode: (i: number) => void;
}

const PDFExamCode = ({i, examCode, updateExamCode, deleteExamCode}: PDFExamCodeProps) => {
  const [showPDF, setShowPDF] = useState(false);
  const { openSnackbar } = useSnackbar();
  const [taskPDFName, setTaskPDFName] = useState(examCode.taskPdf || "");
  const [answerPDFName, setAnswerPDFName] = useState(examCode.answerPdf || "");

  const handleCode = (e): void => {
    if (!isNaN(Number(e.nativeEvent.data)) || e.nativeEvent.inputType.startsWith("delete")) {
      updateExamCode(i, {...examCode, code: e.target.value});
    }
  }

  const addPart = (): void => {
    const newQuestions = [...examCode.questions];
    newQuestions.push([]);
    updateExamCode(i, {...examCode, questions: newQuestions});
  }

  const deletePart = (j: number): void => {
    const newQuestions = examCode.questions.filter((_, index) => index !== j);
    updateExamCode(i, {...examCode, questions: newQuestions});
  }

  const addQuestion = (j: number, type: string): void => {
    const newQuestions = [...examCode.questions];
    const question = new ExamCodeQuestion(type);
    if (question.type === "true-false-thpt") question.point = 1;
    newQuestions[j].push(question);
    updateExamCode(i, {...examCode, questions: newQuestions});
  }

  const updateQuestion = (partIndex: number, questionIndex: number, prop: string, value: any): void => {
    const newQuestions = [...examCode.questions];
    newQuestions[partIndex][questionIndex][`${prop}`] = value;
    updateExamCode(i, {...examCode, questions: newQuestions});
  }

  const deleteQuestion = (partIndex: number, questionIndex: number): void => {
    let newQuestions = [...examCode.questions];
    newQuestions[partIndex] = newQuestions[partIndex].filter((_, index) => index !== questionIndex);
    updateExamCode(i, {...examCode, questions: newQuestions});
  }

  const handlePDFUpload = (e, type: string) => {
    try {
      if (type === "task") {
        updateExamCode(i, {...examCode, taskPDFFile: e.target.files[0]});
        setTaskPDFName(e.target.files[0].name);
      }
      else if (type === "answer") {
        updateExamCode(i, {...examCode, answerPDFFile: e.target.files[0]});
        setAnswerPDFName(e.target.files[0].name);
      }
      else throw new Error;
      console.log(e.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }
    catch (err) {
      console.error(err);
      openSnackbar({
        text: "Không tải được file PDF!",
        type: "error"
      })
    }
  }

  return (
    <Box className="border-y zaui-border-blue-80 mb-6">
      <Box className="flex items-center justify-between zaui-bg-blue-20 p-2 gap-x-1">
        <Box className="flex-1">
          <label>Mã đề: </label>
          <input
            type="text"
            className="py-1 px-2 bg-white w-20 ms-1 focus:outline focus:outline-1"
            placeholder="Mã"
            minLength={3}
            maxLength={3}
            value={examCode.code}
            onChange={e => handleCode(e)}
          />
        </Box>
        <XLg size={24} onClick={() => deleteExamCode(i)} />
      </Box>

      <Box>
        <Box className="border-b zaui-border-gray-40 mb-1">
          <Box className="px-4 py-2 w-full flex items-center justify-between">
            <Text bold>Đề thi</Text>

            <button onClick={() => setShowPDF(!showPDF)}>
            {
              showPDF ? <ChevronUp size={20} /> : <ChevronDown size={20} />
            }
            </button>
          </Box>
          <Box className={showPDF ? "flex flex-col flex-1 p-2 gap-y-4 text-sm" : "hidden"}>
            <Box
              className="py-10 px-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center cursor-pointer"
              onClick={() => document.querySelector(`.task-${i}`).click()}
            >
              <Text>{!taskPDFName ? <>Nhấn vào đây để nhập đề thi (PDF) <span className="zaui-text-red-50">*</span></> : taskPDFName}</Text>
            </Box>
            <input type="file" className={`task-${i} hidden`} accept="application/pdf" onChange={e => handlePDFUpload(e, "task")}  />
            
            <Box
              className="p-4 border border-zinc-300 rounded-lg zaui-text-gray-40 flex place-items-center text-center cursor-pointer"
              onClick={() => document.querySelector(`.answer-${i}`).click()}
            >
              <Text>{!answerPDFName ? <>Nhấn vào đây để file đáp án (PDF) <span className="zaui-text-red-50">*</span></> : answerPDFName}</Text>
            </Box>
            <input type="file" className={`answer-${i} hidden`} accept="application/pdf" onChange={e => handlePDFUpload(e, "answer")} />
          </Box>
        </Box>

        <Box className="flex-1 pt-1 pb-2 px-4 flex justify-between items-center gap-y-2">
          <Text bold>Đáp án:</Text>
          <button
            className="zaui-bg-blue-80 text-white rounded-full py-1 px-4 self-end"
            onClick={addPart}>
            Thêm phần mới
          </button>
        </Box>

        {
          examCode.questions.map((e, partIndex) =>
            <PDFExamPart
              key={`part_${i}_${partIndex}`} partIndex={partIndex}
              questions={e}
              addQuestion={(type: string) => addQuestion(partIndex, type)}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              deletePart={deletePart}
            />
          )
        }
      </Box>
    </Box>
  )
}

export { PDFExamCode };