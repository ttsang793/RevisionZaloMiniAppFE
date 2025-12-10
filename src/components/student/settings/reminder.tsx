import { Box, Text, useSnackbar } from "zmp-ui"
import ReminderList from "./reminderList";
import { StudentReminder, getReminder, addReminder } from "@/models/student";
import { useState, useEffect } from "react";
import { PlusLg } from "react-bootstrap-icons";

const Reminder = () => {
  const [reminderList, setReminderList] = useState<StudentReminder[]>([]);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Box className="section-container">
      <Box className="flex justify-between mb-2">
        <Text.Title>Nhắc nhở ôn tập</Text.Title>

        <button
          type="button" value="+"
          className="zaui-bg-blue-80 text-white rounded-full p-2"
          onClick={handleAddReminder}
        >
          <PlusLg />
        </button>
      </Box>
      {
        (reminderList.length === 0)
          ? <Text className="text-center">Em hãy thêm nhắc nhở nhé!</Text>
          : reminderList.map(r => <ReminderList reminder={r} fetchData={fetchData} key={`remind-${r.id}`} />)
      }
    </Box>
  )

  async function fetchData() {
    getReminder().then(response => setReminderList(response.data));
  }

  async function handleAddReminder(): Promise<void> {
    const response = await addReminder();

    if (response.status === 201) {
      fetchData();
    }
    else {
      openSnackbar({ text: "Thêm nhắc nhở thất bại", type: "error" });
    }
  }
}

export default Reminder;