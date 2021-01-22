import React from "react";
import { Container } from "react-grid-system";

interface SiteWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SiteWrapper = (props: SiteWrapperProps): JSX.Element => {
  const { children } = props;

  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default SiteWrapper;
