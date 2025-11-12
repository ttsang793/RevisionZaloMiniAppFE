import AppHeader from "@/components/header";
import { Box, Page, Text } from "zmp-ui";

export default function Error404() {
  return (
    <Page className="page bg-white">
      <AppHeader title="Lỗi 404" showBackIcon />

      <Box className="flex flex-col gap-y-4 justify-center h-[calc(100dvh-130px)]">
        <Text className="text-center text-8xl font-bold">404</Text>
        <Text className="text-center text-lg italic">
          Đường dẫn không tồn tại, hoặc trang đã bị xóa. Vui lòng thử lại!
        </Text>
      </Box>
    </Page>
  )
}