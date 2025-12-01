import { Text, Box } from "zmp-ui";
import { useState, useEffect } from "react";
import { ExamAttemptGet, getExamAttemptsByExamId } from "@/models/exam-attempt";
import { ExamDetailHolder } from "@/components/teacher/exam/exam-detail-holder";

export default function ExamMarking({id}) {
  const [examAttempts, setExamAttempts] = useState<ExamAttemptGet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getExamAttemptsByExamId(Number(id)).then(response => setExamAttempts(response.data))
    setLoading(false);
  }, [])

  return loading ? <Text>Chờ chút</Text> : (
    <Box className="bg-white p-4">
    {
      examAttempts.map(ea => <ExamDetailHolder examId={id} examAttempt={ea} key={`attempt-${ea.id}`} />)
    }
    </Box>
  )
}