"use client";
import { Modal, em } from "@mantine/core";
import OtpBox from "../../atoms/OtpBox";
import { useMediaQuery } from "@mantine/hooks";

type props = {
  opened: any;
  open: any;
  close: any;
  userName: string;
  callback: () => void;
  mobile?: number | null;
};

// eslint-disable-next-line no-unused-vars
function AuthPopup({ opened, close, userName, callback, mobile }: props) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Modal
      opened={opened}
      onClose={close}
      transitionProps={{ transition: "fade", duration: 200 }}
      zIndex={1000}
      maw={"max-content"}
      centered
      size={isMobile ? "90%" : "40%"}
      className=" w-[90%] md:w-[70%] lg:w-[40%] h-auto "
    >
      <OtpBox
        callback={callback}
        // userName={userName}
        close={close}
        mobile={mobile}
      />
    </Modal>
  );
}

export default AuthPopup;
