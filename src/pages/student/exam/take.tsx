import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { ExamQuestion, getExamQuestionWithQuestions } from "@/models/exam-question";
import { ExamPart } from "@/components/student/exam/exam-part";
import { Exam, getExamById } from "@/models/exam";
import { ExamAttempt, insertAttempt } from "@/models/exam-attempt";
import { fisherYatesShuffle } from "@/script/util";
import { Countdown } from "@/components/student/exam/countdown";

export default function TakeExamPage({practice}: {practice: boolean}) {
  const { id } = useParams();
  const navTo = useNavigate();
  const [allowEarlySubmit, setAllowEarlySubmit] = useState(false);
  const [earlySubmitVisible, setEarlySubmitVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [examAttempt, setExamAttempt] = useState<ExamAttempt>(new ExamAttempt(Number(id), practice));
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
        const shufflePart = fisherYatesShuffle(response.data);
        
        const partIds: number[] = [];
        const partTitles: any[] = [];
        const answerList: any[] = [];
        shufflePart.forEach((d, i) => {
          const shuffleQuestion = fisherYatesShuffle(shufflePart[i].examQuestions);
          //console.log(shuffleQuestion);
          const questionTypes: any[] = [];
          const questionAnswer: any[] = [];
          const questionIndex: number[] = [];
          partIds.push(d.id);
          partTitles.push(d.partTitle);

          shuffleQuestion.forEach(sq => {
            if (!questionIndex.includes(sq.orderIndex)) {
              if (sq.question.type === "multiple-choice")
                sq.question.answerKeys = fisherYatesShuffle([sq.question.correctAnswer, sq.question.wrongAnswer1, sq.question.wrongAnswer2, sq.question.wrongAnswer3]);
              questionTypes.push({question: sq});
              questionAnswer.push("");
              questionIndex.push(sq.orderIndex);
            }
          });
          setExamQuestionList(prev => [...prev, questionTypes]);
          answerList.push(questionAnswer);
        })

        setExamQuestions({...examQuestions, partTitles});
        setExamAnswerList(answerList);
        setLoading(false);
        setExamAttempt({...examAttempt, startedAt: new Date(), partOrder: partIds});
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

      <Box className="mb-2 flex justify-between align-center">
        <Box>
          <Text bold className="inline">Phần:</Text>
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

        <Countdown timeLimit={examInfo.timeLimit} />
      </Box>

      {/* Danh sách câu hỏi của phần */}
      {
        <ExamPart
          i={currentPart} practice={practice}
          partTitle={examQuestions.partTitles[currentPart]}
          partQuestions={examQuestionList[currentPart]}
          answerList={examAnswerList[currentPart]}
          updateAnswerList={(newList: any[]) => updateExamAnswerList(currentPart, newList)}
        />
      }

      <footer className="fixed bottom-0 right-0 left-0 text-center bg-white">
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

  async function turnIn() {
    setEarlySubmitVisible(false);
    const submitStatus = await insertAttempt(examAttempt, examQuestionList, examAnswerList);
    if (submitStatus === 201) navTo(`/student/exam/result/${id}`);
  }
}