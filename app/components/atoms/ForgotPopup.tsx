"use client";
// import { useDisclosure } from "@mantine/hooks";
import { Modal, em } from "@mantine/core";
// import Form from "./form";
// import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mantine/hooks";
import ForgotOtpBox from "./ForgotOtpBox";

type props = {
  opened: any;
  open: any;
  close: any;
  userName: string;
  callback: () => void;
  mobile: number | null;
};

function ForgotAuthPopup({
  opened,
  // open,
  close,
  userName,
  callback,
  mobile,
}: props) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
        zIndex={1000}
        maw={"max-content"}
        size={isMobile ? "90%" : "40%"}
        centered
      >
        {/* {JSON.stringify(session)} */}
        {/* <Form /> */}
        <ForgotOtpBox
          callback={callback}
          userName={userName}
          close={close}
          mobile={mobile}
        />
      </Modal>
      {/* 
      <Button
        key={"loginBtn"}
        onChange={() => open()}
        buttonClass=""
        title="OPEN"
      /> */}
    </>
  );
}

export default ForgotAuthPopup;
