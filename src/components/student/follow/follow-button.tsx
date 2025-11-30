import { useState, useEffect } from 'react';
import { getFollowing, following } from '@/models/student';
import { useSnackbar } from 'zmp-ui';

const FollowButton = ({teacherId}) => {
  const [follow, setFollow] = useState(false);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    getFollowing(teacherId).then(response => setFollow(response.data))
  }, []);

  return (
    <button
      className="zaui-bg-blue-80 text-white rounded-full py-1 px-2 text-sm"
      onClick={() => handleFollowing()}
    >
      {follow ? "Bỏ theo" : "Theo"} dõi
    </button>
  )

  async function handleFollowing() {
    const response = await following(teacherId);

    if (response.status === 200) {
      openSnackbar({
        text: `${follow ? "Bỏ theo" : "Theo"} dõi giáo viên thành công!`,
        type: "success",
        duration: 1500
      });
      setFollow(!follow);
    }
    else {
      openSnackbar({
        text: `${follow ? "Bỏ theo" : "Theo"} dõi giáo viên thất bại!`,
        type: "error"
      });
    }
  }
}

export { FollowButton }