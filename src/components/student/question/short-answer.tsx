import { Box, Input, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import { CheckLg, XLg } from "react-bootstrap-icons";

const showCorrect = (isCorrect: boolean | undefined) => {
  if (isCorrect === null) return <></>
  if (isCorrect) return <CheckLg size={24} className="inline zaui-text-green-70" />
  return <XLg size={24} className="inline zaui-text-red-70" />
}

const TraLoiNgan = ({i, question, answer, practice, updateAnswer}) => {
  /*
  const [answer, setAnswer] = useState<{ [key: number]: string }>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const checkTLNInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const number = Number(value);

    const updateAnswerAndMove = (newValue: string) => {
      const ans = { ...answer };
      ans[index] = newValue;
      setAnswer(ans);

      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    if ((number >= 1 && number <= 9) || (index >= 2 && number === 0) || value === "") {
      updateAnswerAndMove(value);
    }
    else if (index === 1 && value === "-") {
      updateAnswerAndMove("–");
    }
    else if ((index > 1 && index < 4) && value === "," && Number(answer[index - 1])) {
      updateAnswerAndMove(value);
    }
  };*/

  const [cell, setCell] = useState(answer || ["", "", "", ""]);
  const { TextArea } = Input;
  const [checkCorrect, setCheckCorrect] = useState(false);
  const handleCell = (j, value) => {
    const newCell = [...cell];
    newCell[j] = value;
    updateAnswer(newCell);
    setCell(newCell);
  }

  return (
    <>
      <Box className="border border-gray-300 py-1 px-2">
        <Text size="small" bold className="text-justify">
          Câu {i + 1}. {question.title}
        </Text>
        <Box className="mt-1">
          {[0, 1, 2, 3].map((j) => (
            <input
              className={`size-8 text-center border border-gray-400 rounded-lg me-2 ${checkCorrect ? `font-bold zaui-text-${question.answerKey === answer.join("") ? "green" : "red"}-70` : ""}`}
              maxLength={1}
              //onInput={e => checkTLNInput(e, 1)}
              value={cell[j]}
              key={j}
              readOnly={checkCorrect}
              onChange={e => handleCell(j, e.target.value)}
            />
          ))} { checkCorrect && showCorrect(question.answerKey === answer.join("")) }
        </Box>

        {
          (practice && checkCorrect && question.answerKey !== answer.join("")) ? (
            <Box className="mt-2">
              <>
                {question.answerKey.split("").map((ak: string, i: number) => (
                  <input
                    className="size-8 text-center font-bold border border-gray-400 rounded-lg me-2 zaui-text-green-70"
                    value={ak} readOnly
                  />
                ))} <CheckLg size={24} className="zaui-text-green-70 inline" />
              </>
            </Box>
          ) : <></>
        }
      </Box>
      
      {
        !practice ? <></> : (
          <>
            <Box className="text-center mt-3" onClick={() => setCheckCorrect(!checkCorrect)}>
            {
              checkCorrect ? (
                <>
                  <button className="py-2 px-8 zaui-bg-yellow-70 zaui-text-yellow-10 rounded-full">
                    Thử lại
                  </button>

                  {
                    !question.explanation ? <></> : <TextArea label={<Text>Giải thích:</Text>} readOnly value={question.explanation} />
                  }
                </>
              ) : (
                <button className="py-2 px-8 zaui-bg-green-70 zaui-text-green-10 rounded-full">
                  Check đáp án
                </button>
              )
            }
            </Box>
          </>
        )
      }
    </>
  )
}

const TraLoiNganResult = ({i, answer}) => {
  const question = answer.question;

  return (
    <Box className="border border-gray-300 py-1 px-2">
      <Text size="small" bold className="text-justify">
        Câu {i + 1}. {question.title}
      </Text>
      <Box className="mt-1">
        {[0, 1, 2, 3].map((j) => (
          <input
            className={`size-8 text-center border border-gray-400 rounded-lg me-2 font-bold zaui-text-${answer.correct ? "green" : "red"}-70`}
            value={answer.studentAnswer[j]}
            maxLength={1} key={j} readOnly
          />
        ))} { showCorrect(answer.correct) }
      </Box>

      {
        (answer.correct) ? <></> : (
          <Box className="mt-2">
            <>
              {question.answerKey.split("").map((ak: string, i: number) => (
                <input
                  className="size-8 text-center font-bold border border-gray-400 rounded-lg me-2 zaui-text-green-70"
                  value={ak} readOnly
                />
              ))} <CheckLg size={24} className="zaui-text-green-70 inline" />
            </>
          </Box>
        )
      }
    </Box>
  )
}

export { TraLoiNgan, TraLoiNganResult }