import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Input, Radio, Select, Text } from "zmp-ui";
import { useState, useEffect } from "react";
import "./multiple-choice.css"

// integrate image later

const QuestionMakerMutipleChoice = () => {
  const { TextArea } = Input;
  const [topicList, setTopicList] = useState([]);
  const navTo = useNavigate();

  useEffect(() => {

  }, [])

  return (
    <form>
      <Input
        label={<Text>Tiêu đề câu hỏi <span className="zaui-text-red-50">*</span></Text>}
        placeholder="Tiêu đề câu hỏi" required
      />

      <Box>
        <Text className="my-2">Đáp án <span className="zaui-text-red-50">*</span></Text>
        <Radio.Group name="answer" className="w-full" defaultValue="A">
          <Radio value="A" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 1*" required />
          </Radio>
          <Radio value="B" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 2*" required />
          </Radio>
          <Radio value="C" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 3*" required />
          </Radio>
          <Radio value="D" className="zaui-border-gray-30 zaui-bg-steelblue-20">
            <Input placeholder="Đáp án 4*" required />
          </Radio>
        </Radio.Group>
      </Box>

      <Select
        label={<Text className="mt-2">Lớp <span className="zaui-text-red-50">*</span></Text>}
        defaultValue={-1} closeOnSelect
      >
        <Select.Option value={-1} title="Lớp" disabled className="zaui-text-red-50" />
        <Select.Option value={6} title="Lớp 6" />
        <Select.Option value={7} title="Lớp 7" />
        <Select.Option value={8} title="Lớp 8" />
        <Select.Option value={9} title="Lớp 9" />
        <Select.Option value={10} title="Lớp 10" />
        <Select.Option value={11} title="Lớp 11" />
        <Select.Option value={12} title="Lớp 12" />
      </Select>

      <Input
        label={<Text className="mt-2">Dạng câu hỏi</Text>}
        value="Trắc nghiệm 4 đáp án" disabled
      />

      <Select
        label={<Text className="mt-2">Độ khó <span className="zaui-text-red-50">*</span></Text>}
        defaultValue={-1} closeOnSelect
      >
        <Select.Option value={-1} title="Độ khó" disabled className="zaui-text-red-50" />
        <Select.Option value={1} title="Nhận biết" />
        <Select.Option value={2} title="Thông hiểu" />
        <Select.Option value={3} title="Vận dụng thấp" />
        <Select.Option value={4} title="Vận dụng cao" />
      </Select>

      <Select
        label={<Text className="mt-2">Chủ đề <span className="zaui-text-red-50">*</span></Text>}
        defaultValue={-1} closeOnSelect
      >
        <Select.Option value={-1} title="Chủ đề" disabled className="zaui-text-red-50" />
        <Select.Option value="0" title="Lớp 6" />
        <Select.Option value="1" title="Lớp 7" />
      </Select>

      <TextArea
        label={<Text className="mt-2">Lời giải/Giải thích</Text>}
        placeholder="Lời giải/Giải thích"
      />

      <Text className="zaui-text-red-50 text-left italic mb-2" bold>
        *: Các trường bắt buộc
      </Text>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
        <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )
}

export { QuestionMakerMutipleChoice }