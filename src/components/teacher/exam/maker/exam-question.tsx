import { useState, useEffect } from "react";
import { Box } from "zmp-ui";
import { ChevronDown, ChevronUp, XLg } from "react-bootstrap-icons";
import { Question } from "@/models/question";
import SelectQuestion from "../../select-question";
import { getQuestionsFilterByTeacher } from "@/models/question";

interface ExamGroupQuestionProps {
  numQuestion: number;
  data: { point: number; id: number[]; type: string };
  updateQuestion: (updated: any) => void;
  deleteQuestion: (i: number) => void;
}

const ExamGroupQuestion = ({
  numQuestion,
  data,
  updateQuestion,
  deleteQuestion
}: ExamGroupQuestionProps) => {
  const [showDetail, setShowDetail] = useState(true);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestionsFilterByTeacher("", data.type).then(res => setAvailableQuestions(res.data));
  }, []);

  function handlePointChange(value: number) {
    updateQuestion({ ...data, point: value });
  }

  function toggleSelectQuestion(q: Question) {
    const exists = data.id.includes(q.id!);
    const newIds = exists ?
      data.id.filter(id => id !== q.id) :
      ((data.type === "true-false-thpt" && data.id.length === 1) ? data.id : [...data.id, q.id]);

    updateQuestion({ ...data, id: newIds });
  }

  return (
    <Box className={showDetail ? "border-b zaui-border-blue-80" : ""}>
      <Box className="zaui-bg-blue-20 zaui-text-blue-80 border-b zaui-border-blue-80 px-4 py-2 w-full flex items-center gap-x-1">
        <p className="flex-1 text-left font-bold">Câu {numQuestion + 1}.</p>

        <input
          className="px-2 bg-white w-16 me-1 py-1 rounded-lg"
          type="number"
          step="0.05"
          min={0} max={10}
          value={data.point}
          onChange={e => handlePointChange(parseFloat(e.target.value) || 0)}
          placeholder="điểm"
        />

        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <button onClick={() => deleteQuestion(numQuestion)}>
          <XLg size={20} />
        </button>
      </Box>

      {showDetail && (
        <Box className="flex-1 p-2 gap-y-4">
          <Box className="border zaui-border-gray-30 min-h-0 max-h-40 overflow-auto divide-y">
            {availableQuestions.map((q, i) => (
              <SelectQuestion
                key={i}
                question={q}
                filter
                handleQuestion={() => toggleSelectQuestion(q)}
              />
            ))}
          </Box>

          {data.id.length > 0 && (
            <Box className="mt-2 border-t pt-2">
              {availableQuestions
                .filter(q => data.id.includes(q.id!))
                .map((q, i) => (
                  <SelectQuestion
                    key={`selected-${i}`}
                    question={q}
                    handleQuestion={() => toggleSelectQuestion(q)}
                  />
                ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export { ExamGroupQuestion };
