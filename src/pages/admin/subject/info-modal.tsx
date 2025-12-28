import { Subject, getSubjectById, insertSubject, updateSubject } from "@/models/subject";
import { Icon, Text, Input, Button, Checkbox, useSnackbar } from "zmp-ui";
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
  const [errors, setErrors] = useState<{id?: string, name?: string, grade?: string}>({});

  useEffect(() => {
    if (editId != "") fillSubject();
  }, [editId])

  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full z-50 ${visible ? "flex items-center justify-center" : "hidden"}`}>
      <div className="bg-white mx-20 p-8 relative">
        <button className="absolute top-2 right-5 text-3xl" onClick={() => closeModal()}>&times;</button>

        <Text.Title className="text-center text-3xl mb-5">{editId ? "CẬP NHẬT MÔN HỌC" : "THÊM MÔN HỌC MỚI"}</Text.Title>

        <div className="grid grid-cols-[1fr_3fr] gap-x-5">
          <Input
            value={subject.id}
            placeholder="Nhập mã (tối đa 4 kí tự)"
            label="Nhập mã môn học:"
            maxLength={4}
            onChange={e => handleChangeId(e.target.value)}
            disabled={editId !== ""}
            errorText={errors.id} status={!errors.id ? "" : "error"}
          />

          <Input
            value={subject.name}
            placeholder="Nhập tên môn học"
            label="Nhập tên môn học:"
            maxLength={100}
            onChange={e => { setErrors({...errors, name: ""}); setSubject({...subject, name: e.target.value})} }
            errorText={errors.name} status={!errors.name ? "" : "error"}
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

        <Text className="error mt-1">
          {!errors.grade ? <></> : <><Icon icon="zi-warning-solid" />{errors.grade}</> }
        </Text>

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
          onClick={() => validation()}
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
    setErrors({});
    setSubject(
      {
        id: "", name: "", grades: [], isVisible: true,
        questionMC: false, questionTF: false, questionSA: false,
        questionGF: false, questionST: false,
      }
    )
  }

  function handleChangeId(val: string) {
    if (!editId) {
      setErrors({...errors, id: ""});
      setSubject({...subject, id: val})
    }
  }

  function handleGrade(grade: number) {
    setErrors({...errors, grade: ""});
    const grades = subject.grades;
    const index = grades.findIndex(c => c === grade);
    index === -1 ? grades.push(grade) : grades.splice(index, 1);
    setSubject({...subject, grades});
  }

  function validation() {
    const newError: {id?: string, name?: string, grade?: string} = {};
    if (!subject.id) newError.id = "Vui lòng nhập mã môn học!";
    else if (/^[a-zA-Z]{2,4}$/.test(subject.id) === false) newError.id = "Mã môn học phải từ 2-4 chữ cái!";

    if (!subject.name) newError.name = "Vui lòng nhập tên môn học!";
    if (subject.grades.length === 0) newError.grade = "Vui lòng chọn ít nhất 1 lớp học!";

    setErrors(prev => prev = newError);
    if (Object.keys(newError).length !== 0) return;
    else handleValidSubmit();
  }
  
  function handleValidSubmit() {
    const orderClasses = subject.grades.sort((a, b) => a - b);
    setSubject({...subject, id: subject.id.toUpperCase(), grades: orderClasses});

    openSnackbar({
      text: `Bạn có muốn ${editId ? "cập nhật thông tin" : "thêm"} môn học này?`,
      action: {
        text: "Có",
        close: true,
        onClick: async () => {
          const response = editId ? await updateSubject(subject) : await insertSubject(subject);

          if (response.status === 200 || response.status === 201) {
            openSnackbar({
              text: `${editId ? "Cập nhật" : "Thêm"} môn học thành công!`,
              type: "success",
              duration: 1500
            })
            fetchData();
            setVisible(false);
          }
          else if (response.status === 409) {
            console.error(response);
            const { nameError } = response.response.data;
            if (nameError) setErrors({...errors, name: nameError});
          }
          else {
            openSnackbar({
              text: `${editId ? "Cập nhật" : "Thêm"} môn học thất bại!`,
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