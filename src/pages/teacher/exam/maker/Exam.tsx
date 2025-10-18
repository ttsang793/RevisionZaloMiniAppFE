import { useState, useEffect } from "react";
import { Box, Page, useNavigate, useParams } from "zmp-ui";
import { ChevronUp } from "react-bootstrap-icons";
import AppHeader from "@/components/header";
import { ExamPart } from "@/components/teacher/exam/maker/exam-part";
import { backToTop } from "@/script/util";
import { ExamQuestion, getExamQuestion, updateExam } from "@/models/exam-question";

export default function ExamQuestions() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [examQuestions, setExamQuestions] = useState<ExamQuestion>(new ExamQuestion(Number(id)));
  const [examQuestionList, setExamQuestionList] = useState<any[][]>([]);
  const [loading, setLoading] = useState(true);

  function addPart() {
    const newPartTitles = [...examQuestions.partTitles, ""];
    const newQuestionList = [...examQuestionList, []];
    setExamQuestions({ ...examQuestions, partTitles: newPartTitles });
    setExamQuestionList(newQuestionList);
  }

  function updatePartTitle(i: number, value: string) {
    const newPartTitles = [...examQuestions.partTitles];
    newPartTitles[i] = value;
    setExamQuestions({ ...examQuestions, partTitles: newPartTitles });
  }

  function updateQuestionList(i: number, value: any[]) {
    const newList = [...examQuestionList];
    newList[i] = value;
    setExamQuestionList(newList);
  }

  function deletePart(i: number) {
    if (examQuestions.partTitles.length === 1) return;
    const newTitles = examQuestions.partTitles.filter((_, index) => index !== i);
    const newList = examQuestionList.filter((_, index) => index !== i);
    setExamQuestions({ ...examQuestions, partTitles: newTitles });
    setExamQuestionList(newList);
  }

  useEffect(() => {
    if (loading) {
      getExamQuestion(Number(id)).then(response => {
        const partTitles: any[] = [];
        response.data.forEach((d, i) => {
          const questionTypes: any[] = [];
          partTitles.push(d.partTitle);
          d.questionTypes.forEach((t, j) => {
            questionTypes.push({point: response.data[i].examQuestions[j].point, id: response.data[i].examQuestions.filter(q => q.orderIndex === j + 1).map(q => q.questionId), type: t});
          })
          setExamQuestionList(prev => [...prev, questionTypes]);
        })
        setExamQuestions({...examQuestions, partTitles});
        setLoading(false);
      });
    }
  }, []);

  return loading ? <></> : (
    <Page className="page-x-0 page-wo-footer">
      <AppHeader title="Danh sách câu hỏi" showBackIcon />

      <form onSubmit={e => e.preventDefault()}>
        <Box className="mb-3 flex flex-wrap justify-center gap-2 py-2 bg-white">
          <input
            type="submit"
            value="Lưu"
            className="zaui-bg-blue-80 text-white rounded-full py-2 px-6"
            onClick={() => updateExam(examQuestions, examQuestionList)}
          />
          <input
            type="button"
            value="Hủy"
            className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-6"
            onClick={() => navTo("/teacher/exam")}
          />
        </Box>
      </form>

      {examQuestions.partTitles.map((p, i) => (
        <ExamPart
          key={i}
          i={i}
          partTitle={p}
          questionList={examQuestionList[i] || []}
          updatePartTitle={updatePartTitle}
          updateQuestionList={updateQuestionList}
          deletePart={deletePart}
        />
      ))}

      <button
        className="size-9 zaui-bg-blue-70 text-white rounded-full fixed bottom-4 right-40 text-center"
        onClick={backToTop}
      >
        <ChevronUp className="inline" />
      </button>

      <button
        className="px-4 py-2 zaui-bg-blue-70 text-white rounded-full fixed bottom-4 right-4 flex items-center gap-x-1"
        onClick={addPart}
      >
        Thêm phần mới
      </button>
    </Page>
  );
}