import AppHeader from "@/components/header";
import { Box, Page, Text } from "zmp-ui";

export default function Error403() {
  return (
    <Page className="page bg-white">
      <AppHeader title="Lỗi 403" showBackIcon />

      <Box className="flex flex-col gap-y-4 justify-center h-[calc(100dvh-130px)]">
        <Text className="text-center text-8xl font-bold">403</Text>
        <Text className="text-center text-lg italic">
          Bạn không có quyền truy cập vào trang. Vui lòng thoát ra!
        </Text>
      </Box>
    </Page>
  )
}