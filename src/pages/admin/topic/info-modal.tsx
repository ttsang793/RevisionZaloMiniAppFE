import { Topic, getTopicById, insertTopic, updateTopic } from "@/models/topic";
import { getActiveSubjects, Subject } from "@/models/subject";
import { Icon, Text, Input, Button, Checkbox, Select, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";

export default function InfoTopicModal({visible = false, setVisible, editId = "", setEditId, fetchData}) {
  const { openSnackbar } = useSnackbar();
  const [subjectList, setSubjectList] = useState([]);
  const [topic, setTopic] = useState<Topic>({ id: "", name: "", grades: [], subjectId: "" });
  const [errors, setErrors] = useState<{name?: string, grade?: string, subject?: string}>({});

  useEffect(() => {
    if (editId !== "") getTopicById(editId).then(topic => setTopic(topic));
    getActiveSubjects().then(subject => setSubjectList(subject))
  }, [editId])

  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full z-50 ${visible ? "flex items-center justify-center" : "hidden"}`}>
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
            onChange={e => { setErrors({...errors, name: ""}); setTopic({...topic, name: e.target.value})} }
            errorText={errors.name} status={!errors.name ? "" : "error"}
          />
        </div>

        <div>
          <Text size="small" className="mt-4 mb-2">Lớp:</Text>
          <Checkbox className="me-2" checked={topic.grades.includes(6)} label="6" value={6} onChange={() => handleGrade(6)} />
          <Checkbox className="me-2" checked={topic.grades.includes(7)} label="7" value={7} onChange={() => handleGrade(7)} />
          <Checkbox className="me-2" checked={topic.grades.includes(8)} label="8" value={8} onChange={() => handleGrade(8)} />
          <Checkbox className="me-2" checked={topic.grades.includes(9)} label="9" value={9} onChange={() => handleGrade(9)} />
          <Checkbox className="me-2" checked={topic.grades.includes(10)} label="10" value={10} onChange={() => handleGrade(10)} />
          <Checkbox className="me-2" checked={topic.grades.includes(11)} label="11" value={11} onChange={() => handleGrade(11)} />
          <Checkbox checked={topic.grades.includes(12)} label="12" value={12} onChange={() => handleGrade(12)} />
        </div>

        <Text className="error mt-1">
          {!errors.grade ? <></> : <><Icon icon="zi-warning-solid" />{errors.grade}</> }
        </Text>

        <Select
          label="Môn học" closeOnSelect defaultValue="-1"
          label={<Text size="small" className="mt-4">Môn học <span className="required">*</span></Text>}
          onChange={(e: string) => { setErrors({...errors, subject: ""}); setTopic({...topic, subjectId: e})} }
          errorText={errors.subject} status={!errors.subject ? "" : "error"}
        >
          <Select.Option value="-1" title="Chọn môn học" disabled />
          {
            subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
          }
        </Select>

        <Button
          fullWidth
          onClick={() => validation()}
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
    setErrors({});
    setTopic({ name: "", grades: [], subjectId: "" });
  }

  function handleGrade(grade: number) {
    setErrors({...errors, grade: ""});
    const grades = topic.grades;
    const index = grades.findIndex(c => c === grade);
    index === -1 ? grades.push(grade) : grades.splice(index, 1);
    setTopic({...topic, grades});
  }

  function validation() {
    const newError: {name?: string, grade?: string, subject?: string} = {};
    if (!topic.name) newError.name = "Vui lòng nhập tên môn học!";
    if (topic.grades.length === 0) newError.grade = "Vui lòng chọn ít nhất 1 lớp học!";
    if (!topic.subjectId || topic.subjectId === "-1") newError.subject = "Vui lòng chọn môn học!";

    setErrors(prev => prev = newError);
    if (Object.keys(newError).length !== 0) return;
    else handleValidSubmit();
  }

  function handleValidSubmit() {
    const orderClasses = topic.grades.sort((a, b) => a - b);
    
    if (editId) setTopic({...topic, grades: orderClasses, id: editId});
    else setTopic({...topic, grades: orderClasses});

    openSnackbar({
      text: `Bạn có muốn ${editId ? "cập nhật thông tin" : "thêm"} chủ đề này?`,
      action: {
        text: "Có",
        close: true,
        onClick: async () => {
          const response = editId ? await updateTopic(topic) : await insertTopic(topic);

          if (editId ? response.status === 200 : response.status === 201) {
            openSnackbar({
              text: `${editId ? "Cập nhật" : "Thêm"} chủ đề thành công!`,
              type: "success",
              duration: 1500
            })
            setVisible(false);
            fetchData();
          }
          else {
            openSnackbar({
              text: `${editId ? "Cập nhật" : "Thêm"} chủ đề thất bại!`,
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