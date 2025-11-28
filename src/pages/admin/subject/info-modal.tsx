import { Subject, getSubjectById, insertSubject, updateSubject } from "@/models/subject";
import { Text, Input, Button, Checkbox, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";

export default function InfoSubjectModal({visible = false, setVisible, editId = "", setEditId, fetchData}) {
  const { openSnackbar } = useSnackbar();
  const [subject, setSubject] = useState<Subject>(
    {
      id: "", name: "", grades: [], isVisible: true,
      questionMC: false, questionTF: false, questionSA: false,
      questionGF: false, questionST: false,
    }
  );

  useEffect(() => {
    if (editId != "") fillSubject();
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
            disabled={editId !== ""}
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
          <Checkbox className="me-2" checked={subject.grades.includes(6)} label="6" value={6} onChange={() => handleGrade(6)} />
          <Checkbox className="me-2" checked={subject.grades.includes(7)} label="7" value={7} onChange={() => handleGrade(7)} />
          <Checkbox className="me-2" checked={subject.grades.includes(8)} label="8" value={8} onChange={() => handleGrade(8)} />
          <Checkbox className="me-2" checked={subject.grades.includes(9)} label="9" value={9} onChange={() => handleGrade(9)} />
          <Checkbox className="me-2" checked={subject.grades.includes(10)} label="10" value={10} onChange={() => handleGrade(10)} />
          <Checkbox className="me-2" checked={subject.grades.includes(11)} label="11" value={11} onChange={() => handleGrade(11)} />
          <Checkbox checked={subject.grades.includes(12)} label="12" value={12} onChange={() => handleGrade(12)} />
        </div>

        <div>
          <Text size="small" className="mt-4 mb-2">Loại câu hỏi:</Text>
          <div className="grid grid-cols-3 gap-y-2 mb-8">
            <Checkbox className="me-2" checked={subject.questionMC} label="Trắc nghiệm A, B, C, D" value="Trắc nghiệm A, B, C, D" onChange={() => setSubject({...subject, questionMC: !subject.questionMC})} />
            <Checkbox className="me-2" checked={subject.questionTF} label="Trắc nghiệm Đúng – Sai" value="Trắc nghiệm đúng sai" onChange={() => setSubject({...subject, questionTF: !subject.questionTF})} />
            <Checkbox className="me-2" checked={subject.questionSA} label="Trả lời ngắn" value="Trả lời ngắn" onChange={() => setSubject({...subject, questionSA: !subject.questionSA})} />
            <Checkbox className="me-2" checked={subject.questionGF} label="Điền vào chỗ trống" value="Điền vào chỗ trống" onChange={() => setSubject({...subject, questionGF: !subject.questionGF})} />
            <Checkbox className="me-2" checked label="Tự luận" value="Tự luận" disabled />
            <Checkbox checked={subject.questionST} label="Sắp xếp" value="Sắp xếp" onChange={() => setSubject({...subject, questionST: !subject.questionST})} />
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

  async function fillSubject() {
    const data = await getSubjectById(editId);
    setSubject(data);
  }

  function closeModal() {
    setVisible(false);
    setEditId("");
    setSubject(
      {
        id: "", name: "", grades: [], isVisible: true,
        questionMC: false, questionTF: false, questionSA: false,
        questionGF: false, questionST: false,
      }
    )
  }

  function handleGrade(grade) {
    const grades = subject.grades;
    const index = grades.findIndex(c => c === grade);
    index === -1 ? grades.push(grade) : grades.splice(index, 1);
    setSubject({...subject, grades});
  }

  function validation(edit) {
    const isError: boolean = false;

    if (!isError) {
      const orderClasses = subject.grades.sort((a, b) => a - b);
      setSubject({...subject, grades: orderClasses});

      openSnackbar({
        text: `Bạn có muốn ${edit ? "cập nhật thông tin" : "thêm"} môn học này?`,
        action: {
          text: "Có",
          close: true,
          onClick: async () => {
            const response = edit ? await updateSubject(subject) : await insertSubject(subject);

            if (edit ? response.status === 200 : response.status === 201) {
              openSnackbar({
                text: `${edit ? "Cập nhật" : "Thêm"} môn học thành công!`,
                type: "success",
                duration: 1500
              })
              fetchData();
              setVisible(false);
            }
            else {
              openSnackbar({
                text: `${edit ? "Cập nhật" : "Thêm"} môn học thất bại!`,
                type: "error"
              });
              console.error(response);
            }
          }
        },
        type: `${subject.isVisible ? "warning" : "default"}`,
        verticalAction: true,
        icon: true,
        duration: 5000
      });
    }
  }
}