import { Topic, getTopicById, insertTopic, updateTopic } from "@/models/topic";
import { getActiveSubjects, Subject } from "@/models/subject";
import { Text, Input, Button, Checkbox, Select, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";

export default function InfoTopicModal({visible = false, setVisible, editId = "", setEditId, fetchData}) {
  const { openSnackbar } = useSnackbar();
  const [subjectList, setSubjectList] = useState([]);
  const [topic, setTopic] = useState<Topic>({ id: "", name: "", grades: [], subjectId: "" });

  useEffect(() => {
    if (editId !== "") getTopicById(editId).then(topic => setTopic(topic));
    getActiveSubjects().then(subject => setSubjectList(subject))
  }, [editId])

  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full ${visible ? "flex items-center justify-center" : "hidden"}`}>
      <div className="bg-white mx-20 p-8 relative">
        <button className="absolute top-2 right-5 text-3xl" onClick={() => closeModal()}>&times;</button>

        <Text.Title className="text-center text-3xl mb-5">{editId ? "CẬP NHẬT CHỦ ĐỀ" : "THÊM CHỦ ĐỀ MỚI"}</Text.Title>

        <div className={`${editId === "" ? "" : "grid grid-cols-[1fr_3fr] gap-x-5"}`}>
          <Input
            value={editId}
            label="Mã chủ đề:"
            maxLength={4}
            disabled
            className={`${editId === "" ? "hidden" : ""}`}
          />

          <Input
            value={topic.name}
            placeholder="Nhập tên chủ đề"
            label="Tên chủ đề:"
            maxLength={100}
            onChange={e => setTopic({...topic, name: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <Text size="small" className="mt-4 mb-2">Lớp:</Text>
          <Checkbox className="me-2" checked={topic.grades.includes(6)} label="6" value={6} onChange={() => handleGrade(6)} />
          <Checkbox className="me-2" checked={topic.grades.includes(7)} label="7" value={7} onChange={() => handleGrade(7)} />
          <Checkbox className="me-2" checked={topic.grades.includes(8)} label="8" value={8} onChange={() => handleGrade(8)} />
          <Checkbox className="me-2" checked={topic.grades.includes(9)} label="9" value={9} onChange={() => handleGrade(9)} />
          <Checkbox className="me-2" checked={topic.grades.includes(10)} label="10" value={10} onChange={() => handleGrade(10)} />
          <Checkbox className="me-2" checked={topic.grades.includes(11)} label="11" value={11} onChange={() => handleGrade(11)} />
          <Checkbox checked={topic.grades.includes(12)} label="12" value={12} onChange={() => handleGrade(12)} />
        </div>

        <Select
          label="Môn học"
          closeOnSelect
          defaultValue="-1"
          onChange={(e: string) => setTopic({...topic, subjectId: e})}
        >
          <Select.Option value="-1" title="Chọn môn học" disabled />
          {
            subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
          }
        </Select>

        <Button
          fullWidth
          onClick={() => validation(editId)}
          className="mt-8"
        >
          {editId ? "Cập nhật chủ đề" : "Thêm chủ đề mới"}
        </Button>
      </div>
    </div>
  )

  function closeModal() {
    setVisible(false);
    setEditId("");
    setTopic({ name: "", grades: [], subjectId: "" });
  }

  function handleGrade(grade) {
    const grades = topic.grades;
    const index = grades.findIndex(c => c === grade);
    index === -1 ? grades.push(grade) : grades.splice(index, 1);
    setTopic({...topic, grades});
  }

  function validation(edit) {
    const isError: boolean = false;
    
    if (!isError) {
      const orderClasses = topic.grades.sort((a, b) => a - b);
      
      if (edit) setTopic({...topic, grades: orderClasses, id: edit});
      else setTopic({...topic, grades: orderClasses});

      openSnackbar({
        text: `Bạn có muốn ${edit ? "cập nhật thông tin" : "thêm"} chủ đề này?`,
        action: {
          text: "Có",
          close: true,
          onClick: async () => {
            const response = edit ? await updateTopic(topic) : await insertTopic(topic);

            if (edit ? response.status === 200 : response.status === 201) {
              openSnackbar({
                text: `${edit ? "Cập nhật" : "Thêm"} chủ đề thành công!`,
                type: "success",
                duration: 1500
              })
              setVisible(false);
              fetchData();
            }
            else {
              openSnackbar({
                text: `${edit ? "Cập nhật" : "Thêm"} chủ đề thất bại!`,
                type: "error"
              });
              console.error(response);
            }
          }
        },
        type: `${topic.isVisible ? "warning" : "default"}`,
        verticalAction: true,
        icon: true,
        duration: 5000
      });
    }
  }
}