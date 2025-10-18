import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { ExamQuestion, getExamQuestionWithQuestions } from "@/models/exam-question";
import { ExamPart } from "@/components/test/exam-part";
import { Exam, getExamById } from "@/models/exam";

export default function TakeTestPage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [allowEarlySubmit, setAllowEarlySubmit] = useState(false);
  const [earlySubmitVisible, setEarlySubmitVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [examInfo, setExamInfo] = useState<Exam>(new Exam());
  const [examQuestions, setExamQuestions] = useState<ExamQuestion>(new ExamQuestion(Number(id)));
  const [examQuestionList, setExamQuestionList] = useState<any[][]>([]);
  const [examAnswerList, setExamAnswerList] = useState<any[][]>([]);
  const [currentPart, setCurrentPart] = useState(0);

  function updateExamAnswerList(i: number, value: any[]) {
    const newList = [...examAnswerList];
    newList[i] = value;
    setExamAnswerList(newList);
  }

  useEffect(() => {
    if (loading) {
      getExamById(Number(id)).then(response => setExamInfo(response.data));
      getExamQuestionWithQuestions(Number(id)).then(response => {
        const partTitles: any[] = [];
        const answerList: any[] = [];
        response.data.forEach((d, i) => {
          const questionTypes: any[] = [];
          const questionAnswer: any[] = [];
          partTitles.push(d.partTitle);
          d.questionTypes.forEach((_, j) => {
            questionTypes.push({question: response.data[i].examQuestions.filter(q => q.orderIndex === j + 1)[0]});
            questionAnswer.push("")
          })
          setExamQuestionList(prev => [...prev, questionTypes]);
          answerList.push(questionAnswer);
        })
        setExamQuestions({...examQuestions, partTitles});
        setExamAnswerList(answerList);
        setLoading(false);
      })
    }
  }, []);

  return loading ? <></> : (
    <Page className="page-test">
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center uppercase">{examInfo.title}</Text.Title>
      <Text.Title className="text-center">
        Môn: {examInfo.subjectName} &minus; Thời gian: {examInfo.timeLimit / 60} phút
      </Text.Title>

      <hr />

      <Box className="mb-2">
        <b>Phần:</b>
        {
          examQuestions.partTitles.map((e, i) =>
            <button
              className={`rounded-full size-6 ms-1 border ${currentPart === i ? "zaui-border-blue-70 zaui-bg-blue-70 zaui-text-blue-10" : "zaui-border-blue-70 zaui-bg-blue-10 zaui-text-blue-70"}`}
              onClick={() => setCurrentPart(i)} key={e}
            >
              {i + 1}
            </button>
          )
        }
      </Box>

      {/* Danh sách câu hỏi của phần */}
      {        
        <ExamPart
          i={currentPart}
          partTitle={examQuestions.partTitles[currentPart]}
          partQuestions={examQuestionList[currentPart]}
          answerList={examAnswerList[currentPart]}
          updateAnswerList={(newList: any[]) => updateExamAnswerList(currentPart, newList)}
        />
      }

      <footer className="fixed bottom-2 right-0 left-0 text-center bg-white">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => setEarlySubmitVisible(true)}
        >
          Nộp bài
        </button>
      </footer>

      <Modal
        actions = {[
          {
            text: "Chờ chút",
            close: true,
            onClick: () => setEarlySubmitVisible(false)
          },
          {
            text: "Nộp bài",
            close: true,
            highLight: true,
            onClick: () => turnIn()
          }
        ]}
        style={{textAlign: "left"}}
        description="Một khi đã nộp bài, bạn không thể thay đổi đáp án của mình!"
        title="Bạn có muốn nộp bài?"
        visible={earlySubmitVisible}
      />
    </Page>
  )

  function turnIn() {
    setEarlySubmitVisible(false);
    console.log(examAnswerList);
    //navTo("/");
  }
}