import AppHeader from "@/components/header";
import { Box, Page, Input, Select, Text, useParams, useNavigate, useSnackbar } from "zmp-ui";
import { useState, useEffect } from "react";
import { Question, QuestionError, questionType } from "@/models/question";
import { Topic, getActiveTopicByGrades } from "@/models/topic";
import { getSubjectGradesById } from "@/models/subject";
import { render_api } from "@/script/util";

import { QuestionMakerMutipleChoice as MultipleChoice } from "@/components/teacher/question/maker/multiple-choice";
import { QuestionMakerTrueFalse as TrueFalse } from "@/components/teacher/question/maker/true-false";
import { QuestionMakerShortAnswer as ShortAnswer } from "@/components/teacher/question/maker/short-answer";
import { QuestionMakerGapFill as GapFill } from "@/components/teacher/question/maker/gap-fill";
import { QuestionMakerConstructedResponse as ConstructedResponse } from "@/components/teacher/question/maker/constructed-response";
import { QuestionMakerSorting as Sorting } from "@/components/teacher/question/maker/sorting";
import { QuestionMakerTrueFalseTHPT as TrueFalseTHPT } from "@/components/teacher/question/maker/true-false-thpt";

import { MultipleChoiceQuestion, validateMultipleChoiceInput, getMultipleChoiceQuestionById, insertMultipleChoiceQuestion, updateMultipleChoiceQuestion, MultipleChoiceError } from "@/models/multiple-choice-question";
import { TrueFalseQuestion, validateTrueFalseInput, getTrueFalseQuestionById, insertTrueFalseQuestion, updateTrueFalseQuestion } from "@/models/true-false-question";
import { ShortAnswerQuestion, validateShortAnswerInput, getShortAnswerQuestionById, insertShortAnswerQuestion, updateShortAnswerQuestion, ShortAnswerError } from "@/models/short-answer-question";
import { GapFillQuestion, validateGapFillInput, getGapFillQuestionById, insertGapFillQuestion, updateGapFillQuestion, GapFillError } from "@/models/gap-fill-question";
import { ConstructedResponseQuestion, validateConstructedResponseInput, getConstructedResponseQuestionById, insertConstructedResponseQuestion, updateConstructedResponseQuestion, ConstructedResponseError } from "@/models/constructed-response-question";
import { SortingQuestion, validateSortingInput, getSortingQuestionById, insertSortingQuestion, updateSortingQuestion, SortingError } from "@/models/sorting-question";
import { TrueFalseTHPTQuestion, validateTrueFalseTHPTInput, getTrueFalseTHPTQuestionById, insertTrueFalseTHPTQuestion, updateTrueFalseTHPTQuestion, TrueFalseTHPTError } from "@/models/true-false-thpt-question";
import { XLg } from "react-bootstrap-icons";

function renderQuestionMaker(type: string, question, setQuestion, error, setError) {
  switch (type) {
    case questionType[0].type: return <MultipleChoice question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    case questionType[1].type: return <TrueFalse question={question} setQuestion={setQuestion} />;
    case questionType[2].type: return <ShortAnswer question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    case questionType[3].type: return <GapFill question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    case questionType[4].type: return <ConstructedResponse question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    case questionType[5].type: return <Sorting question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    case questionType[6].type: return <TrueFalseTHPT question={question} setQuestion={setQuestion} error={error} setError={setError} />;
    default: return;
  }
}

export default function QuestionMaker() {
  const [gradeList, setGradeList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const { type, id } = useParams();
  const navTo = useNavigate();
  const [question, setQuestion] = useState<Question>(new Question())
  const [error, setError] = useState<QuestionError>(new QuestionError());
  const [image, setImage] = useState(null);
  const [typeTitle, setTypeTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { openSnackbar } = useSnackbar()

  const initQuestion = async () => {
    getSubjectGradesById(sessionStorage.getItem("subjectId")!).then(response => setGradeList(response.data));

    switch (type) {
      case questionType[0].type: {
        setError(new MultipleChoiceError());
        if (id !== undefined) {
          setQuestion(new MultipleChoiceQuestion());
          const response = await getMultipleChoiceQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new MultipleChoiceQuestion());
        setTypeTitle(questionType[0].title);
        break;
      }
      case questionType[1].type: {
        if (id !== undefined) {
          const response = await getTrueFalseQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new TrueFalseQuestion());
        setTypeTitle(questionType[1].title);
        break;
      }
      case questionType[2].type: {
        setError(new ShortAnswerError());
        if (id !== undefined) {
          setQuestion(new ShortAnswerQuestion());
          const response = await getShortAnswerQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new ShortAnswerQuestion());
        setTypeTitle(questionType[2].title);
        break;
      }
      case questionType[3].type: {
        setError(new GapFillError());
        if (id !== undefined) {
          setQuestion(new GapFillQuestion());
          const response = await getGapFillQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new GapFillQuestion());
        setTypeTitle(questionType[3].title);
        break;
      }
      case questionType[4].type: {
        setError(new ConstructedResponseError());
        if (id !== undefined) {
          setQuestion(new ConstructedResponseQuestion());
          const response = await getConstructedResponseQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new ConstructedResponseQuestion());
        setTypeTitle(questionType[4].title);
        break;
      }
      case questionType[5].type: {
        setError(new SortingError());
        if (id !== undefined) {
          setQuestion(new SortingQuestion());
          const response = await getSortingQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new SortingQuestion());
        setTypeTitle(questionType[5].title);
        break;
      }
      case questionType[6].type: {
        setError(new TrueFalseTHPTError());
        if (id !== undefined) {
          setQuestion(new TrueFalseTHPTQuestion());
          const response = await getTrueFalseTHPTQuestionById(Number(id));
          setQuestion(response.data);
          getActiveTopicByGrades(response.data.grade).then(r => setTopicList(r.data));
        }
        else setQuestion(new TrueFalseTHPTQuestion());
        setTypeTitle(questionType[6].title);
        break;
      }
      default: return;
    }
    setLoading(false);
  }

  const handleChangeGrade = (e: number) => {
    setQuestion({...question, grade: e, topicId: "-1"});
    setError({...error, grade: ""})
    getActiveTopicByGrades(e).then(response => setTopicList(response.data));
  }

  useEffect(() => {
    setLoading(true);
    if (!type || questionType.filter(q => q.type === type).length === 0) {
      navTo("/404", { replace: true });
      return;
    }
    else initQuestion();
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files[0].size > 3 * 1024 * 1024) {
      openSnackbar({ text: "Hình ảnh phải nhỏ hơn 3MB!", type: "error" });
      setImage(null);
      return;
    }

    try {
      setImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.querySelector('#question-image').src = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
    }
    catch (err) {
      console.log(err);
      openSnackbar({
        text: "Không tải được hình ảnh!",
        type: "error"
      })
    }
  }

  const deselectImage = () => {
    setImage(null);
    document.querySelector('#image-file').value = null;
    if (!question.imageUrl) document.querySelector('#question-image').src = question.imageUrl;
  }

  if (loading) return <></>
  return (
    <Page className="page page-wo-footer bg-white">
      <AppHeader title={`${id ? "Cập nhật" : "Thêm"} câu hỏi`} showBackIcon />

      <Box className="pt-4">
        <form onSubmit={e => e.preventDefault()} noValidate>
          <Input
            label={<Text>Tiêu đề câu hỏi <span className="required">*</span></Text>}
            placeholder="Tiêu đề câu hỏi" required value={question?.title}
            onChange={e => setQuestion({...question, title: e.target.value})}
            onBlur={() => setError({...error, title: ""})}
            errorText={error.title} status={!error.title ? "" : "error"}
          />

          <Box>
            <label>
              <Text className="mt-2">Hình ảnh minh họa</Text>
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="p-4 border zaui-border-gray-30 rounded-lg w-full text-center mt-2"
              accept="image/png, image/jpeg"
              id="image-file"
            />

            <Box className="relative w-fit">
              <button
                className={!image ? "hidden" : "absolute right-2 top-2 bg-black text-white p-2 rounded-full text-2xl"}
                onClick={deselectImage}
              >
                <XLg size={16} />
              </button>
              <img id="question-image" src={!image ? question.imageUrl : image} alt="Hình câu hỏi" className={`pt-2 ${(!image && !question.imageUrl) ? "h-0" : "h-52"}`} />
            </Box>
          </Box>
          
          { loading ? <></> : renderQuestionMaker(type, question, setQuestion, error, setError) }

          <Select
            label={<Text className="mt-2">Lớp <span className="required">*</span></Text>}
            value={question?.grade} closeOnSelect
            onChange={(e: number) => handleChangeGrade(e)}
            errorText={error.grade} status={!error.grade ? "" : "error"}
          >
            <Select.Option value={-1} title="Lớp" disabled />
            {
              (!gradeList) ? <></> : gradeList.map((grade: number) => <Select.Option value={grade} title={`Lớp ${grade}`} key={`grade_${grade}`} />)
            }
          </Select>

          <Select
            label={<Text className="mt-2">Chủ đề <span className="required">*</span></Text>}
            className={question.grade === -1 ? "hidden" : ""}
            closeOnSelect value={question.topicId} defaultValue="-1"
            onChange={(e: string) => {
              setQuestion({...question, topicId: e});
              setError({...error, topic: ""})
            }}
            errorText={error.topic} status={!error.topic ? "" : "error"}
          >
            <Select.Option value="-1" title="Chủ đề" disabled />
            {
              (!topicList) ? <></> : topicList.map((topic: Topic) => <Select.Option key={topic.id} value={topic.id} title={topic.name} />)
            }
          </Select>

          <Input label={<Text className="mt-2">Dạng câu hỏi</Text>} value={typeTitle} disabled />

          <Select
            label={<Text className="mt-2">Độ khó <span className="required">*</span></Text>}
            closeOnSelect value={question.difficulty}
            onChange={(e: number) => {
              setQuestion({...question, difficulty: e});
              setError({...error, difficulty: ""})
            }}
            errorText={error.difficulty} status={!error.difficulty ? "" : "error"}
          >
            <Select.Option value={-1} title="Độ khó" disabled />
            <Select.Option value={1} title="Nhận biết" />
            <Select.Option value={2} title="Thông hiểu" />
            <Select.Option value={3} title="Vận dụng thấp" />
            <Select.Option value={4} title="Vận dụng cao" />
          </Select>

          <Text className="required text-left italic my-2" bold>
            *: Các trường bắt buộc
          </Text>

          <Box className="flex gap-x-2 justify-center mt-2">
            <input type="submit" value="Lưu" className="zaui-bg-blue-80 text-white rounded-full py-2 px-8" onClick={() => handleSubmit()} />
            <input type="button" value="Hủy" className="zaui-bg-blue-20 zaui-text-blue-80 rounded-full py-2 px-8" onClick={() => navTo("/teacher/question")} />
          </Box>          
        </form>
      </Box>
    </Page>
  )

  async function handleSubmit(): Promise<void> {
    let newError: QuestionError;

    switch (type) {
      case questionType[0].type: newError = validateMultipleChoiceInput(question); break;
      case questionType[1].type: newError = validateTrueFalseInput(question); break;
      case questionType[2].type: newError = validateShortAnswerInput(question); break;
      case questionType[3].type: newError = validateGapFillInput(question); break;
      case questionType[4].type: newError = validateConstructedResponseInput(question); break;
      case questionType[5].type: newError = validateSortingInput(question); break;
      case questionType[6].type: newError = validateTrueFalseTHPTInput(question); break;
      default: return;
    }

    setError(newError);
    if (Object.keys(newError).length > 0) return;
    
    let response: any;

    openSnackbar({
      text: "Đang lưu câu hỏi...",
      type: "loading",
      duration: 5000,
    });

    switch (type) {
      case questionType[0].type: response = (!id) ? await insertMultipleChoiceQuestion(question) : await updateMultipleChoiceQuestion(question, id); break;
      case questionType[1].type: response = (!id) ? await insertTrueFalseQuestion(question) : await updateTrueFalseQuestion(question, id); break;
      case questionType[2].type: response = (!id) ? await insertShortAnswerQuestion(question) : await updateShortAnswerQuestion(question, id); break;
      case questionType[3].type: response = (!id) ? await insertGapFillQuestion(question) : await updateGapFillQuestion(question, id); break;
      case questionType[4].type: response = (!id) ? await insertConstructedResponseQuestion(question) : await updateConstructedResponseQuestion(question, id); break;
      case questionType[5].type: response = (!id) ? await insertSortingQuestion(question) : await updateSortingQuestion(question, id); break;
      case questionType[6].type: response = (!id) ? await insertTrueFalseTHPTQuestion(question) : await updateTrueFalseTHPTQuestion(question, id); break;
      default: break;
    }

    if (response.status === 200 || response.status === 201) {
      if (!image) {
        openSnackbar({
          text: `${!id ? "Thêm" : "Cập nhật"} câu hỏi thành công!`,
          type: "success",
          duration: 1500
        });

        setTimeout(() => navTo("/teacher/question"), 1500);
        return;
      }

      const formData: FormData = new FormData();
      formData.append("file", image);
      
      try {
        response = await render_api.post(`/api/upload/image/${id ? id : response.data.id}/question`,
          formData, { headers: { "Content-Type": "multipart/form-data" } });

        if (response.status === 200) {
          openSnackbar({
            text: `${!id ? "Thêm" : "Cập nhật"} câu hỏi thành công!`,
            type: "success",
            duration: 1500
          });
          setTimeout(() => navTo("/teacher/question"), 1500);
        }
        else {
          console.error(response);
          openSnackbar({
            text: `${!id ? "Thêm" : "Cập nhật"} câu hỏi thành công, nhưng tải hình thất bại: ${response.response.data.error}`,
            type: "success",
            duration: 1500
          });
          setTimeout(() => navTo("/teacher/question"), 1500);
        }
      }
      catch (err) {
        console.error(err);
        openSnackbar({
          text: `${!id ? "Thêm" : "Cập nhật"} câu hỏi thành công, nhưng tải hình thất bại!`,
          type: "success",
          duration: 1500
        });
        setTimeout(() => navTo("/teacher/question"), 1500);
      }
    }
    else {
      openSnackbar({
        text: `${!id ? "Thêm" : "Cập nhật"} câu hỏi thất bại!`,
        type: "error"
      });
    }
  }
}