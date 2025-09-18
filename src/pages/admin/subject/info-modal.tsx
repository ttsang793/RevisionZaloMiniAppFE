import { Subject, getSubjectById, insertSubject, updateSubject } from "./uiHandlers";
import { Text, Input, Button, Checkbox } from "zmp-ui";
import { useState, useEffect } from "react";

export default function InfoSubjectModal({visible = false, setVisible, editId = "", setEditId}) {
  const [subject, setSubject] = useState<Subject>(
    {
      id: "", name: "", classes: [], isVisible: true,
      questionTN: false, questionDS: false, questionTLN: false,
      questionDVCT: false, questionTL: true, questionSX: false,
    }
  );

  useEffect(() => {
    if (editId != "") fillStudent();
  }, [editId])

  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full ${visible ? "flex items-center justify-center" : "hidden"}`}>
      <div className="bg-white mx-20 p-8 relative">
        <button className="absolute top-2 right-5 text-3xl" onClick={() => closeModal()}>&times;</button>

        <Text.Title className="text-center text-3xl mb-5">{editId ? "CẬP NHẬT MÔN HỌC" : "THÊM MÔN HỌC MỚI"}</Text.Title>

        <div className="grid grid-cols-[1fr_3fr] gap-x-5">
          <Input
            value={subject.id}
            placeholder="Nhập mã (tối đa 4 kí tự)"
            label="Nhập mã môn học:"
            maxLength={4}
            onChange={e => !editId && setSubject({...subject, id: e.target.value})}
            disabled={editId === ""}
          />

          <Input
            value={subject.name}
            placeholder="Nhập tên môn học"
            label="Nhập tên môn học:"
            maxLength={100}
            onChange={e => setSubject({...subject, name: e.target.value})}
          />
        </div>

        <div>
          <Text size="small" className="mt-4 mb-2">Lớp:</Text>
          <Checkbox className="me-2" checked={subject.classes.includes(6)} label="6" value={6} onChange={() => handleGrade(6)} />
          <Checkbox className="me-2" checked={subject.classes.includes(7)} label="7" value={7} onChange={() => handleGrade(7)} />
          <Checkbox className="me-2" checked={subject.classes.includes(8)} label="8" value={8} onChange={() => handleGrade(8)} />
          <Checkbox className="me-2" checked={subject.classes.includes(9)} label="9" value={9} onChange={() => handleGrade(9)} />
          <Checkbox className="me-2" checked={subject.classes.includes(10)} label="10" value={10} onChange={() => handleGrade(10)} />
          <Checkbox className="me-2" checked={subject.classes.includes(11)} label="11" value={11} onChange={() => handleGrade(11)} />
          <Checkbox checked={subject.classes.includes(12)} label="12" value={12} onChange={() => handleGrade(12)} />
        </div>

        <div>
          <Text size="small" className="mt-4 mb-2">Loại câu hỏi:</Text>
          <div className="grid grid-cols-3 gap-y-2 mb-8">
            <Checkbox className="me-2" checked={subject.questionTN} label="Trắc nghiệm A, B, C, D" value="Trắc nghiệm A, B, C, D" onChange={() => setSubject({...subject, questionTN: !subject.questionTN})} />
            <Checkbox className="me-2" checked={subject.questionDS} label="Trắc nghiệm Đúng – Sai" value="Trắc nghiệm đúng sai" onChange={() => setSubject({...subject, questionDS: !subject.questionDS})} />
            <Checkbox className="me-2" checked={subject.questionTLN} label="Trả lời ngắn" value="Trả lời ngắn" onChange={() => setSubject({...subject, questionTLN: !subject.questionTLN})} />
            <Checkbox className="me-2" checked={subject.questionDVCT} label="Điền vào chỗ trống" value="Điền vào chỗ trống" onChange={() => setSubject({...subject, questionDVCT: !subject.questionDVCT})} />
            <Checkbox className="me-2" checked label="Tự luận" value="Tự luận" disabled />
            <Checkbox checked={subject.questionSX} label="Sắp xếp" value="Sắp xếp" onChange={() => setSubject({...subject, questionSX: !subject.questionSX})} />
          </div>
        </div>

        <Button
          fullWidth
          onClick={() => validation(editId)}
        >
          {editId ? "Cập nhật môn học" : "Thêm môn học mới"}
        </Button>
      </div>
    </div>
  )

  async function fillStudent() {
    const data = await getSubjectById(editId);
    setSubject(data);
  }

  function closeModal() {
    setVisible(false);
    setEditId("");
    setSubject(
      {
        id: "", name: "", classes: [], isVisible: true,
        questionTN: false, questionDS: false, questionTLN: false,
        questionDVCT: false, questionTL: true, questionSX: false,
      }
    )
  }

  function handleGrade(grade) {
    const classes = subject.classes;
    const index = classes.findIndex(c => c === grade);
    index === -1 ? classes.push(grade) : classes.splice(index, 1);
    setSubject({...subject, classes});
  }

  function validation(edit) {
    const isError: boolean = false;

    if (!isError) {
      const orderClasses = subject.classes.sort((a, b) => a - b);
      setSubject({...subject, classes: orderClasses});
      edit ? updateSubject(subject) : insertSubject(subject);
    }
  }
}