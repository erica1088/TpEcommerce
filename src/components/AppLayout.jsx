import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect } from "react";

import Routing from "../.routes/Routing";

const AppLayout = () => {
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      gridTemplateRows={"auto 1fr auto"}
      gridTemplateColumns={"1fr"}
      minHeight="100vh"
    >
      <GridItem area="header">
        <Header />
      </GridItem>

      <GridItem
        area="main"
        backgroundColor="transparent"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <ScrollToTop />
        <Routing />
      </GridItem>

      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;
