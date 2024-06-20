/** @jsx jsx */
import { jsx } from "@emotion/core";

// This page displays a regular link on the page, and we've got a styled component
// for that.
import { Link } from "components/lib";

function NotFoundScreen() {
  return (
    <div
      css={{
        height: "100%",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        Sorry... nothing here.
        <Link to={"/discover"}> Go home</Link>
      </div>
    </div>
  );
}

export { NotFoundScreen };
