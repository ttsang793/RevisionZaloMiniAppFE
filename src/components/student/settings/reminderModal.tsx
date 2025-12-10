import { StudentReminder, updateReminder } from "@/models/student";
import { Box, Text, Button, Checkbox, useSnackbar } from "zmp-ui";
import { useState } from "react";

interface ReminderModalProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  reminder: StudentReminder;
  fetchData: () => Promise<void>
}

const ReminderModal = ({visible = false, setVisible, reminder, fetchData}: ReminderModalProps) => {
  const [currentReminder, setCurrentReminder] = useState(reminder);
  const { openSnackbar } = useSnackbar();

  const handleDate = (i: number) => {
    const newDate = currentReminder.date;
    newDate[i] = !newDate[i];
    setCurrentReminder({...currentReminder, date: newDate});
  }

  return (
    <Box className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full z-50 ${visible ? "flex items-center justify-center" : "hidden"}`}>
      <Box className="bg-white mx-20 py-4 px-8 relative rounded-lg">
        <button className="absolute top-2 right-5 text-3xl" onClick={() => closeModal()}>&times;</button>

        <Box className="mb-3">
          <label htmlFor="time" className="block mb-2">Thời gian (Giờ : Phút)</label>
          <input
            min="07:00" max="22:00" type="time"
            className="border border-gray-400 rounded-lg mb-2 w-full p-2"
            value={currentReminder.hour}
            onChange={e => setCurrentReminder({...currentReminder, hour: e.target.value})}
          />
          <Text size="xSmall">Hệ thống giới hạn giờ nhắc nhở từ 7h sáng đến 10h tối để đảm bảo sức khỏe!</Text>
        </Box>

        <Box className="flex gap-3 mb-6">
          <Checkbox value="" checked={currentReminder.date[0]} label="CN" onChange={() => handleDate(0)} />
          <Checkbox value="" checked={currentReminder.date[1]} label="T2" onChange={() => handleDate(1)} />
          <Checkbox value="" checked={currentReminder.date[2]} label="T3" onChange={() => handleDate(2)} />
          <Checkbox value="" checked={currentReminder.date[3]} label="T4" onChange={() => handleDate(3)} />
          <Checkbox value="" checked={currentReminder.date[4]} label="T5" onChange={() => handleDate(4)} />
          <Checkbox value="" checked={currentReminder.date[5]} label="T6" onChange={() => handleDate(5)} />
          <Checkbox value="" checked={currentReminder.date[6]} label="T7" onChange={() => handleDate(6)} />
        </Box>

        <Box className="flex gap-3 justify-center">
          <Button onClick={() => handleUpdate(currentReminder)} size="small">
            Lưu
          </Button>
          <Button variant="secondary" onClick={closeModal} size="small">
            Hủy
          </Button>
        </Box>
      </Box>
    </Box>
  )

  async function handleUpdate(reminder: StudentReminder): Promise<void> {
    const response = await updateReminder(reminder.id, reminder);
    if (response.status === 200) {
      openSnackbar({ text: "Cập nhật nhắc nhở thành công!", type: "success", duration: 1500 });
      setVisible(false);
      await fetchData();
    }
    else {
      openSnackbar({ text: "Cập nhật nhắc nhở thành công!", type: "error", duration: 1500 });
      console.error(response);
    }
  }

  function closeModal() {
    setVisible(false);
    setCurrentReminder(reminder);
  }
}

export default ReminderModal;