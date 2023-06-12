import Home from "components/admin/ui/Home/Home";
import Script from "next/script";

const AdminPage = () => {
  return (
    <>
      <Script src="/dymo-sdk.js" />
      <Home />
    </>
  );
};

export default AdminPage;
