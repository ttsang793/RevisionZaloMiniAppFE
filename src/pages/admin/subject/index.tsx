import { useState, useEffect } from "react";
import { Eye, EyeSlash, Pencil, PlusCircleFill } from "react-bootstrap-icons";
import { Box, Page, Text } from "zmp-ui";

import { Subject, getSubjects, deleteSubject } from "@/models/subject";
import InfoSubjectModal from "./info-modal";

export default function SubjectManagement() {
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  let [visible, setVisible] = useState(false);
  let [editId, setEditId] = useState("");

  useEffect(() => {
    getSubjects().then(subject => setSubjectList(subject))
      .catch(err => {
        console.error(err);
        setSubjectList([]);
      });
      setLoading(false);
  }, [])

  return (
    <Page className="page-admin">
      <Text.Title
        className="text-center uppercase text-3xl mb-3 font-bold"
      >
          Quản lý môn học
      </Text.Title>

      <Box className="place-items-end mb-4">
        <button
          className="bg-blue-900 rounded-lg text-zinc-100 px-6 py-3 flex items-center"
          onClick={() => setVisible(true)}
        >
          <PlusCircleFill className="inline me-2" size={20}/> Thêm môn học mới
        </button>
      </Box>

      <table className="w-full">
        <thead className="cursor-default">
          <tr className="bg-blue-100">
            <th className="border border-zinc-700" rowSpan={2}>ID</th>
            <th className="border border-zinc-700" rowSpan={2}>Tên môn học</th>
            <th className="border border-zinc-700" rowSpan={2}>Lớp</th>
            <th className="border border-zinc-700 py-1" colSpan={6}>Dạng câu hỏi</th>
            <th className="border border-zinc-700" rowSpan={2}>Hành động</th>
          </tr>
          <tr className="bg-blue-100">
            <th className="border border-zinc-700 py-1">
              <abbr title="Trắc nghiệm A, B, C, D">TN</abbr>
            </th>
            <th className="border border-zinc-700">
              <abbr title="Trắc nghiệm Đúng &#x2013; Sai">ĐS</abbr>
            </th>
            <th className="border border-zinc-700">
              <abbr title="Trắc nghiệm Trả lời ngắn">TLN</abbr>
            </th>
            <th className="border border-zinc-700">
              <abbr title="Điền vào chỗ trống">ĐVCT</abbr>
            </th>
            <th className="border border-zinc-700">
              <abbr title="Tự luận">TL</abbr>
            </th>
            <th className="border border-zinc-700">
              <abbr title="Sắp xếp thử tự">SX</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          loading ? (
            <tr>
              <th colSpan={10} className="bg-white border border-zinc-500 font-medium italic py-1">
                Đang tải dữ liệu...
              </th>
            </tr>
          ) : (
            subjectList.length === 0 ? (
              <tr>
                <th colSpan={10} className="bg-white border border-zinc-500 font-medium italic py-1">
                  Chưa có môn học nào!
                </th>
              </tr>
            ) : subjectList.map((subject: Subject) =>
              <tr key={subject.id} className="odd:bg-white even:bg-blue-50 hover:bg-blue-400/20 cursor-pointer duration-150">
                <th className="font-medium border border-zinc-500 py-1">{subject.id}</th>
                <td className="border border-zinc-500 px-2">{subject.name}</td>
                <td className="border border-zinc-500 px-2">
                {
                  subject.grades.map((c: number, i: number) => (i === 0) ? c : `, ${c}`)
                }
                </td>
                <td className="border border-zinc-500 text-center">{subject.questionTN ? <>&#x2714;</> : ""}</td>
                <td className="border border-zinc-500 text-center">{subject.questionDS ? <>&#x2714;</> : ""}</td>
                <td className="border border-zinc-500 text-center">{subject.questionTLN ? <>&#x2714;</> : ""}</td>
                <td className="border border-zinc-500 text-center">{subject.questionDVCT ? <>&#x2714;</> : ""}</td>
                <td className="border border-zinc-500 text-center">{subject.questionTL ? <>&#x2714;</> : ""}</td>
                <td className="border border-zinc-500 text-center">{subject.questionSX ? <>&#x2714;</> : ""}</td>

                <td className="border border-zinc-500 text-center">
                {
                  subject.isVisible ? (
                    <>
                      <abbr title="Cập nhật">
                        <Pencil size={20} className="inline me-1" onClick={() => { setVisible(true); setEditId(subject.id) }} />
                      </abbr>

                      <abbr title="Ẩn môn học">
                        <Eye size={20} className="inline" onClick={() => deleteSubject(subject.id, subject.isVisible!)} />
                      </abbr>
                    </>
                  ) : (
                    <abbr title="Hiển môn học">
                      <EyeSlash size={20} className="inline" onClick={() => deleteSubject(subject.id, subject.isVisible!)} />
                    </abbr>
                  )
                }
                </td>
              </tr>
            ) 
          )
        }
        </tbody>
      </table>

      <InfoSubjectModal visible={visible} setVisible={setVisible} editId={editId} setEditId={setEditId} />
    </Page>
  )
}