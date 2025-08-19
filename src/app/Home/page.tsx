import SidebarPage from "../layout/page"
import { PdfUploader } from "@/components/UploadGabarito"
export default function page() {
  return (
    <>
      <SidebarPage>
        <PdfUploader />
      </SidebarPage>
    </>
  )
}
