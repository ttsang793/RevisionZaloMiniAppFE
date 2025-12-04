import AppHeader from "@/components/header";
import axios from "axios";
import { Page, Input, Text, Box, useNavigate, useSnackbar } from "zmp-ui";
import { useState } from "react";
import QuestionList from "@/components/teacher/question/question-list";
import mammoth from 'mammoth';
import { Question } from "@/models/question";
import { MultipleChoiceQuestion, insertMultipleChoiceQuestion } from "@/models/multiple-choice-question";
import { TrueFalseQuestion, insertTrueFalseQuestion } from "@/models/true-false-question";
import { ShortAnswerQuestion, insertShortAnswerQuestion } from "@/models/short-answer-question";
import { GapFillError, insertGapFillQuestion } from "@/models/gap-fill-question";
import { ConstructedResponseQuestion, insertConstructedResponseQuestion } from "@/models/constructed-response-question";
import { SortingQuestion, insertSortingQuestion } from "@/models/sorting-question";
import { TrueFalseTHPTQuestion, insertTrueFalseTHPTQuestion } from "@/models/true-false-thpt-question";

export default function QuestionImportWord() {
  const navTo = useNavigate();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [filename, setFilename] = useState("");
  const { openSnackbar } = useSnackbar();

  const handleUploadFile = e => {
    const file = e.target.files[0];

    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.onload = e => {
        const arrayBuffer = e.target.result;

        mammoth.extractRawText({arrayBuffer})
          .then(result => {
            const questions = result.value.split("\n\n\n\n");
            const qList: Question[] = [];
            questions.forEach(q => {
              const temp = q.split("\n\n");

              if (temp[0].startsWith("[QMC]")) {
                const ques = new MultipleChoiceQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "multiple-choice";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                ques.correctAnswer = temp[3].substring(5);
                ques.wrongAnswer = temp[4].substring(4).split(";");
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QTF]")) {
                const ques = new TrueFalseQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "true-false";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                ques.answerKey = temp[3].substring(5) === "Đ" ? true : false;
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QSA]")) {
                const ques = new ShortAnswerQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "short-answer";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                ques.answerKey = temp[3].substring(5);
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QGF]")) {
                const ques = new GapFillQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "gap-fill";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                ques.answerKeys = temp[3].substring(5).split(";");
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QCR]")) {
                const ques = new ConstructedResponseQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "constructed-response";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                if (temp[3]) ques.answerKeys = temp[3].substring(5).split(";");
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QST]")) {
                const ques = new SortingQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                ques.correctOrder = temp[3].substring(5).split(";");
                ques.type = "sorting";
                qList.push(ques);
              }
              else if (temp[0].startsWith("[QTFPT]")) {
                const ques = new TrueFalseTHPTQuestion();
                ques.title = temp[0].substring(temp[0].indexOf(" ") + 1);
                ques.type = "true-false-thpt";
                ques.grade = Number(temp[1].substring(6));
                ques.difficulty = Number(temp[2].substring(5));
                qList.push(ques);

                for (let i = 3; i <= 6; i++) {
                  ques.statements.push(temp[i].substring[5]);
                  ques.answerKeys.push(temp[i][2] === "Đ" ? true : false)
                }
              }
            })

            if (!qList || qList.length === 0) {
              openSnackbar({
                text: "Vui lòng tải file docx hợp lệ!",
                type: "error"
              });
            }
            else {
              setQuestionList(qList);
              console.log(qList);
              setFilename(document.querySelector("#docx-reader").value.substring(document.querySelector("#docx-reader").value.lastIndexOf("\\")+1));
            }
          })
          .catch(err => {
            console.error("Error reading docx file: " + err);
            openSnackbar({
              text: "Đã có lỗi đọc file!",
              type: "error"
            });
          })
      }

      reader.readAsArrayBuffer(file);
    }
    else setError("Vui lòng tải file docx hợp lệ!");
  }
  
  return (
    <Page className="page page-wo-footer bg-white">
      <AppHeader title="Nhập từ file Word" showBackIcon />

      <Box className="pt-4">
        <Input
          label={<Text>File Word <span className="zaui-text-red-50">*</span></Text>}
          placeholder="Nhấn vào đây để nhập file Word"
          readOnly className="cursor-pointer" value={filename}
          onClick={() => document.querySelector("#docx-reader").click()}
        />
        <input type="file" accept=".docx" id="docx-reader" onChange={handleUploadFile} className="h-0" />
      </Box>
      
      {
        (questionList.length === 0) ? <></> : (
          <form noValidate onSubmit={e => e.preventDefault()}>
            <div className="flex items-center">
              <Text bold className="flex-1">Danh sách câu hỏi <span className="zaui-text-red-50">*</span></Text>
            </div>
            <hr />
            
            {
              questionList.map((q, index) => <QuestionList question={q} key={index} />)
            }

            <div className="flex gap-x-2 justify-center mt-2">
              <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
              <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
            </div>
          </form>
        )
      }
    </Page>
  )

  async function handleSubmit(): Promise<void> {
    try {
      let count = await submitEachQuestion();

      if (count > 0) {
        openSnackbar({
          text: `Đã thêm ${count} câu hỏi thành công!`,
          type: "success",
          duration: 1500
        });
        setTimeout(() => navTo("/teacher/question"), 1500);
      }
      else openSnackbar({
        text: "Thêm câu hỏi thất bại!",
        type: "error"
      });
    }
    catch (err) {
      console.error(err);
      openSnackbar({
        text: "Thêm câu hỏi thất bại!",
        type: "error"
      });
    }
  }

  async function submitEachQuestion(): Promise<number> {
    let count = 0;

      for (const q of questionList) {
      let response: any;

      switch (q.type) {
        case "multiple-choice": response = await insertMultipleChoiceQuestion(q); break;
        case "true-false": response = await insertTrueFalseQuestion(q); break;
        case "short-answer": response = await insertShortAnswerQuestion(q); break;
        case "gap-fill": response = await insertGapFillQuestion(q); break;
        case "constructed-response": response = await insertConstructedResponseQuestion(q); break;
        case "sorting": response = await insertSortingQuestion(q); break;
        case "true-false-thpt": response = await insertTrueFalseTHPTQuestion(q); break;
        default: break;
      }

      if (response.status === 201) count += 1;
    }

  return count;
}
}