import { Box, Text, Switch, useSnackbar } from "zmp-ui";
import { X } from "react-bootstrap-icons";
import { updateReminder, deleteReminder, StudentReminder } from "@/models/student";
import { useState } from "react";
import ReminderModal from "./reminderModal";

interface ReminderListProps {
  reminder: StudentReminder;
  fetchData: () => Promise<void>;
}

const ReminderList = ({reminder, fetchData}: ReminderListProps) => {
  const { openSnackbar } = useSnackbar();
  const [visible, setVisible] = useState(false);

  return (
    <Box className="pb-2 mb-2 border-b border-gray-200 grid grid-cols-[1fr_64px] items-center">
      <Box onClick={() => setVisible(true) }>
        <Text.Title size="xLarge" className="mb-1">{reminder.hour}</Text.Title>
        <ul className="flex gap-x-2 text-xs">
          <li className={reminder.date[0] ? "" : "text-gray-400"}>CN</li>
          <li className={reminder.date[1] ? "" : "text-gray-400"}>T2 </li>
          <li className={reminder.date[2] ? "" : "text-gray-400"}>T3 </li>
          <li className={reminder.date[3] ? "" : "text-gray-400"}>T4 </li>
          <li className={reminder.date[4] ? "" : "text-gray-400"}>T5 </li>
          <li className={reminder.date[5] ? "" : "text-gray-400"}>T6 </li>
          <li className={reminder.date[6] ? "" : "text-gray-400"}>T7 </li>
        </ul>
      </Box>

      
      <Box className="flex">
        <Switch checked={reminder.isActive} onChange={toggleActive} />
        <X size={24} onClick={handleDelete} />
      </Box>

      <ReminderModal
        visible={visible}
        setVisible={setVisible}
        reminder={reminder}
        fetchData={fetchData}
      />
    </Box>
  )

  async function toggleActive(): Promise<void> {
    const currentReminder: StudentReminder = {...reminder, isActive: !reminder.isActive};

    try {
      const response = await updateReminder(reminder.id, currentReminder);
      if (response.status === 200) {
        await fetchData();
      }
      else {
        console.error(response);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(): Promise<void> {
    const response = await deleteReminder(reminder.id);
    if (response.status === 200) {
      openSnackbar({ text: "Xóa nhắc nhở thành công!", type: "success", duration: 1500 });
      await fetchData();
    }
    else {
      console.error(response);
      openSnackbar({ text: "Xóa nhắc nhở thất bại!", type: "error" });
    }
  }
}

export default ReminderList;