import { Box, Page, Text, Modal, useParams, useNavigate } from "zmp-ui";
import { useState, useEffect } from "react";
import { getExamCodeByExamId } from "@/models/pdf-exam-code";

export default function TakePDFExamPage({practice}: {practice: boolean}) {
  const { id } = useParams();
  const navTo = useNavigate();

  useEffect(() => {
    getExamCodeByExamId(Number(id)).then(response => console.log(response.data));
  })

  return (
    <>
    Hello World;
    </>
  )
}