import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import AlertPreview from "@/components/AlertPreview";
import Navbar from "@/components/Navbar";
// import MessageBar from "@/components/MessageBar";
import Headroom from "react-headroom";

const Layout = ({ preview, children }: Props) => {
  // const [isDismissed, setIsDismissed] = React.useState(false);

  return (
    <>
      <Box role="banner" as="header" zIndex={10} pos="relative">
        <Headroom>
          {/* {!isDismissed && (
            <MessageBar
              description="Hey I'm a messagebar:"
              onDismiss={setIsDismissed}
              btnText="go home"
              actionLink="/"
            />
          )} */}
          <Navbar />
        </Headroom>
      </Box>

      {/* Coming soon… */}
      <Box d="none">
        <AlertPreview preview={preview} />
      </Box>

      <Box as="main" role="main" pos="relative">
        {children}
      </Box>
      {/* <Box as="footer" role="contentinfo">
        <Footer />
      </Box> */}
    </>
  );
};

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}

export default Layout;
