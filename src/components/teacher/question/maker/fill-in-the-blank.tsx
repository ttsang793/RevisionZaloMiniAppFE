import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Select, Text, Checkbox, Box } from "zmp-ui";
import { useState, useEffect } from "react";

const QuestionMakerFillInTheBlank = () => {
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
        <Box className="flex my-2 items-center">
          <Text className="flex-1">Đáp án <span className="zaui-text-red-50">*</span></Text>
          <button className="zaui-bg-blue-80 text-white rounded-full py-1 px-4">
            Thêm đáp án mới
          </button>
        </Box>

        <Box className="border zaui-border-gray-40 zaui-bg-steelblue-20 p-2">
          <Input placeholder="Nhập đáp án" />
        </Box>
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
        value="Điền vào chỗ trống" disabled
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

      <Text className="zaui-text-red-50 text-left italic" bold>
        *: Các trường bắt buộc
      </Text>
      
      <Checkbox className="mt-2" id="mark-as-wrong" value="true">
        <Text>Đánh dấu các câu trả lời không khớp với nhóm đáp án là sai.</Text>
      </Checkbox>

      <div className="flex gap-x-2 justify-center mt-2">
        <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" />
        <input type="reset" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
      </div>
    </form>
  )
}

export { QuestionMakerFillInTheBlank }