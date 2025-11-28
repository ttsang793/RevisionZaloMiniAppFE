import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Text, Box } from "zmp-ui";
import { questionType } from "@/models/question";
import { floatTwoDigits } from "@/script/util";

const difficultyTitle = ["Nhận biết", "Thông hiểu", "Vận dụng thấp", "Vận dụng cao"]

const CorrectRate = ({ratingList}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex justify-between py-4 w-full"
        onClick={() => setOpen(!open)}
      >
        <Text size="large">{difficultyTitle[ratingList.difficulty - 1]} ({floatTwoDigits(ratingList.percentage)}%)</Text>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {
        !open ? <></> :
        <Box>
        {
          ratingList.types.length === 0 ? <Text className="text-center py-2">Chưa gặp câu hỏi có độ khó này!</Text> : (
            <ul className="list-disc ms-4">
            {
              ratingList.types.map(type => 
                <li className="py-2">
                  {questionType.find(q => q.type == type.type)!.title}: {type.count}/{type.total} {(type.type === "sorting" || type.type === "true-false-thpt") ? "mệnh đề" : "câu"} ({floatTwoDigits(type.percentage)}%)
                </li>
              )
            }
            </ul>
          )
        }
        </Box>
      }
    </>
  )
}

export { CorrectRate }