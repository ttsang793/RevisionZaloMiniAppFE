import { FormEvent, useState } from "react";
import { useSnackbar, useNavigate } from "zmp-ui";
import axios from "axios";

const SampleUpload = () => {
  const [image, setImage] = useState(null);
  const { openSnackbar } = useSnackbar();
  const navTo = useNavigate();

  return (
    <form onSubmit={e => handleSubmit(e)} className="page bg-white">
      <input type="file" id="sample-image-upload" accept="image/jpeg,image/png,application/pdf" onChange={handleImageUpload} />
      
      <img src="" alt="sample-image" id="sample-image" className={(!image) ? "h-0" : "h-96"} />

      <input
        type="submit" value="Lưu"
        className="btn zaui-bg-blue-60 text-white mt-2 p-2"        
      />
    </form>
  )

  function handleImageUpload(e) {
    try {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.querySelector("#sample-image").src = e.target.result;
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

  async function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    const formData: FormData = new FormData();
    
    formData.append("file", image);

    try {
      const response = await axios.post("/api/upload/pdf", formData, { headers: { "Content-Type": "multipart/form-data" } });
      console.log(response);

      if (response.status === 200) {
        openSnackbar({
          text: "Thêm thành công!",
          type: "success",
          duration: 1500
        });
        //setTimeout(() => navTo(0), 1500);
      }
      else {
        openSnackbar({
          text: response.response.data.error || "Tải hình thất bại!",
          type: "error"
        });
      }
    }
    catch (err) {
      if (err.status === 400) {
        openSnackbar({
          text: "Vui lòng chọn hình ảnh.",
          type: "error"
        });
      }
      else openSnackbar({
        text: err.response.data.error || "Tải hình thất bại!",
        type: "error"
      });
    }
  }
}

export default SampleUpload;