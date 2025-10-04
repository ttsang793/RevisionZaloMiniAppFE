import { Topic, getTopicById, insertTopic, updateTopic } from "@/models/topic";
import { getSubjects, Subject } from "@/models/subject";
import { Text, Input, Button, Checkbox, Select } from "zmp-ui";
import { useState, useEffect } from "react";

export default function InfoTopicModal({visible = false, setVisible, editId = "", setEditId}) {
  const [subjectList, setSubjectList] = useState([]);
  const [topic, setTopic] = useState<Topic>({ id: "", name: "", classes: [], subjectId: "" });

  useEffect(() => {
    if (editId !== "") getTopicById(editId).then(topic => setTopic(topic));
    getSubjects().then(subject => setSubjectList(subject))
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
          <Checkbox className="me-2" checked={topic.classes.includes(6)} label="6" value={6} onChange={() => handleGrade(6)} />
          <Checkbox className="me-2" checked={topic.classes.includes(7)} label="7" value={7} onChange={() => handleGrade(7)} />
          <Checkbox className="me-2" checked={topic.classes.includes(8)} label="8" value={8} onChange={() => handleGrade(8)} />
          <Checkbox className="me-2" checked={topic.classes.includes(9)} label="9" value={9} onChange={() => handleGrade(9)} />
          <Checkbox className="me-2" checked={topic.classes.includes(10)} label="10" value={10} onChange={() => handleGrade(10)} />
          <Checkbox className="me-2" checked={topic.classes.includes(11)} label="11" value={11} onChange={() => handleGrade(11)} />
          <Checkbox checked={topic.classes.includes(12)} label="12" value={12} onChange={() => handleGrade(12)} />
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
    setTopic({ name: "", classes: [], subjectId: "" });
  }

  function handleGrade(grade) {
    const classes = topic.classes;
    const index = classes.findIndex(c => c === grade);
    index === -1 ? classes.push(grade) : classes.splice(index, 1);
    setTopic({...topic, classes});
  }

  function validation(edit) {
    const isError: boolean = false;
    
    if (!isError) {
      const orderClasses = topic.classes.sort((a, b) => a - b);
      
      if (edit) {
        setTopic({...topic, classes: orderClasses, id: edit});
        updateTopic(topic);
      }
      else {
        setTopic({...topic, classes: orderClasses});
        insertTopic(topic);
      }
    }
  }
}