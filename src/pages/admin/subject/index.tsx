import { useState, useEffect } from "react";
import { Pencil, PlusCircle, X } from "react-bootstrap-icons";
import { Page, Text } from "zmp-ui";

import { Subject, getSubjects, deleteSubject } from "./uiHandlers";
import InfoSubjectModal from "./info-modal";

export default function SubjectManagement() {
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  let [visible, setVisible] = useState(false);
  let [editId, setEditId] = useState("");

  useEffect(() => {
    getSubjects().then(subject => setSubjectList(subject));
    setLoading(false);
  }, [])

  return loading ? <h1>Hello Subject!</h1> : (
    <Page>
      <Text.Title>Quản lý môn học</Text.Title>
      <button className="bg-zinc-700 rounded-full text-zinc-100 px-4 py-1 flex items-center" onClick={() => setVisible(true)}>
        <PlusCircle className="inline me-1"/> Thêm môn học mới
      </button>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>ID</th>
            <th rowSpan={2}>Tên môn học</th>
            <th rowSpan={2}>Lớp</th>
            <th colSpan={6}>Dạng câu hỏi</th>
            <th rowSpan={2}>Hành động</th>
            <th rowSpan={2}>Hiển thị</th>
          </tr>
          <tr>
            <th>
              <abbr title="Trắc nghiệm A, B, C, D">TN</abbr>
            </th>
            <th>
              <abbr title="Trắc nghiệm Đúng &#x2013; Sai">ĐS</abbr>
            </th>
            <th>
              <abbr title="Trắc nghiệm Trả lời ngắn">TLN</abbr>
            </th>
            <th>
              <abbr title="Điền vào chỗ trống">ĐVCT</abbr>
            </th>
            <th>
              <abbr title="Tự luận">TL</abbr>
            </th>
            <th>
              <abbr title="Sắp xếp thử tự">SX</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          subjectList.map((subject: Subject) =>
            <tr key={subject.id}>
              <th>{subject.id}</th>
              <td>{subject.name}</td>
              <td>
              {
                subject.classes.map((c: number, i: number) => (i === 0) ? c : `, ${c}`)
              }
              </td>
              <td>{subject.questionTN ? <>&#x2714;</> : ""}</td>
              <td>{subject.questionDS ? <>&#x2714;</> : ""}</td>
              <td>{subject.questionTLN ? <>&#x2714;</> : ""}</td>
              <td>{subject.questionDVCT ? <>&#x2714;</> : ""}</td>
              <td>{subject.questionTL ? <>&#x2714;</> : ""}</td>
              <td>{subject.questionSX ? <>&#x2714;</> : ""}</td>

              <td className="text-center">
                <Pencil size={18} className="inline" onClick={() => { setVisible(true); setEditId(subject.id) }} />
                <X size={24} className="inline" onClick={() => deleteSubject(subject.id, subject.isVisible!)} />
              </td>

              <td>{subject.isVisible ? <>&#x2714;</> : ""}</td>
            </tr>
          )
        }
        </tbody>
      </table>

      <InfoSubjectModal visible={visible} setVisible={setVisible} editId={editId} setEditId={setEditId} />
    </Page>
  )
}