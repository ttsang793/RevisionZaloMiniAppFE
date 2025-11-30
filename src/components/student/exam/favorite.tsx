import { useState, useEffect } from "react"
import { HeartFill, Heart } from "react-bootstrap-icons";
import { isFavorite, handleFavorite } from "@/models/student";
import { useSnackbar } from "zmp-ui";

const FavoriteIcon = ({examId, size = 24}: {examId: number, size?: number}) => {
  const [favorite, setFavorite] = useState(false);
  const {openSnackbar} = useSnackbar();

  useEffect(() => {
    isFavorite(examId).then(response => setFavorite(response.data))
  }, []);

  return (favorite) ? <HeartFill size={size} color="#00378A" onClick={() => toggleFavorite()} />
                    : <Heart size={size} color="#00378A" onClick={() => toggleFavorite()} />

  async function toggleFavorite() {
    const response = await handleFavorite(examId);
    if (response.status === 200) {
      openSnackbar({
        text: `${favorite ? "Bỏ yêu" : "Yêu"} thích đề thi thành công!`,
        type: "success",
        duration: 1500
      });
      setFavorite(!favorite);
    }
    else {
      openSnackbar({
        text: `${favorite ? "Bỏ yêu" : "Yêu"} thích đề thi thất bại!`,
        type: "error"
      });
    }
  }
}

export { FavoriteIcon }