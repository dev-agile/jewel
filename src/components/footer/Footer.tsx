import { useState } from "react";
import Pagination from "../pagination/Pagination";

interface FooterProps {
  selectedProductNames: string;
}

const Footer = ({
  selectedProductNames,

}: FooterProps) => {
  const [page, setPage] = useState(1);
  const data = {
    count: 16,
  };
  const numberOfDataInOnePage = 10;

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <section>
      <div>
        <Pagination
          onPageChange={(pageNum: number) => onPageChange(pageNum)}
          page={page}
          totalPages={Math.ceil(data?.count / numberOfDataInOnePage)}
          selectedProductNames={selectedProductNames}
        />
      </div>
    </section>
  );
};

export default Footer;
