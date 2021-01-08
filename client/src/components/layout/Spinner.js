import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
export const Spinner = () => {
  return (
    <>
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    </>
  );
};
