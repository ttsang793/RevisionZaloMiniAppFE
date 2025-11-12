import AppHeader from "@/components/header";
import { Box, Page, Text } from "zmp-ui";

export default function Error500() {
  return (
    <Page className="page bg-white">
      <AppHeader title="Lỗi 500" showBackIcon />

      <Box className="flex flex-col gap-y-4 justify-center h-[calc(100dvh-130px)]">
        <Text className="text-center text-8xl font-bold">500</Text>
        <Text className="text-center text-lg italic">
          Đã có lỗi xảy ra từ hệ thống, vui lòng thử lại sau!
        </Text>
      </Box>
    </Page>
  )
}