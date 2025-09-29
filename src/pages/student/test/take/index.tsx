import { Page, Text, Modal, useParams } from "zmp-ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { TracNghiem, DungSai, TraLoiNgan, DienVaoChoTrong } from "@/components/question/question";

export default function TakeTestPage() {
  const { id } = useParams();
  const navTo = useNavigate();
  const [allowEarlySubmit, setAllowEarlySubmit] = useState(false);
  const [earlySubmitVisible, setEarlySubmitVisible] = useState(false);

  return (
    <Page className="page-test">
      {/* Tiêu đề và các phần */}
      <Text.Title className="text-center">KIỂM TRA THƯỜNG XUYÊN LẦN 1</Text.Title>
      <Text.Title className="text-center">Môn: Toán - Thời gian: 90 phút</Text.Title>

      <hr />

      <div className="mb-2">
        <b>Phần:</b>
        <button className="rounded-full size-6 zaui-bg-blue-70 ms-1 text-white">1</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 ms-1 text-white">2</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 ms-1 text-white">3</button>
      </div>

      {/* Danh sách câu hỏi của phần */}
      <div className="zaui-bg-blue-70 zaui-text-blue-10 px-3 py-2 text-justify mb-2">
        Phần I. Trắc nghiệm khách quan (3,0 điểm)
      </div>

      <div className="mb-2 flex justify-center gap-2 flex-wrap overflow-y-auto">
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">1</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">2</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">3</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">4</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">5</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">6</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">7</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">8</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">9</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">10</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">11</button>
        <button className="rounded-full size-6 zaui-bg-blue-70 text-white">12</button>
      </div>

      <div id="question">
        <TraLoiNgan />
      </div>

      <footer className="fixed bottom-2 right-0 left-0 text-center bg-white">
        <button
          className="rounded-full zaui-bg-blue-70 zaui-text-blue-10 py-2 px-8"
          onClick={() => setEarlySubmitVisible(true)}
        >
          Nộp bài
        </button>
      </footer>

      <Modal
        actions = {[
          {
            text: "Chờ chút",
            close: true,
            onClick: () => setEarlySubmitVisible(false)
          },
          {
            text: "Nộp bài",
            close: true,
            highLight: true,
            onClick: () => turnIn()
          }
        ]}
        style={{textAlign: "left"}}
        description="Một khi đã nộp bài, bạn không thể thay đổi đáp án của mình!"
        title="Bạn có muốn nộp bài?"
        visible={earlySubmitVisible}
      />
    </Page>
  )

  function turnIn() {
    setEarlySubmitVisible(false);
    navTo("/");
  }
}