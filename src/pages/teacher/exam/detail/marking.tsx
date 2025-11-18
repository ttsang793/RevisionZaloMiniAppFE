import { Text, Box } from "zmp-ui";
import { useState, useEffect } from "react";

export default function ExamMarking(id) {
  const [examAttempts, setExamAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [])

  return loading ? <Text>Chờ chút</Text> : (
    <Text>
      Hello Worlđ
    </Text>
  )
}