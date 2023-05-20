import React from "react";
import { AccordionItem as Item } from "@szhsin/react-accordion";

const AccordionItem = ({ header, ...rest }) => {
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <img
            className={`ml-auto transition-transform duration-200 ease-in-out ${
              isEnter && "rotate-180"
            }`}
            src={`/src/assets/arrow.svg`}
            alt="arrow"
          />
        </>
      )}
      className="border-b"
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full p-4 text-left hover:bg-slate-100 ${
            isEnter && "bg-slate-200"
          }`,
      }}
      contentProps={{
        className: "transition-height duration-200 ease-in-out",
      }}
      panelProps={{ className: "p-2 flex flex-col gap-2" }}
    />
  );
};

export default AccordionItem;
