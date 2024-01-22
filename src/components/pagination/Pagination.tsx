import { useState, useEffect } from "react";
import cn from "classnames";

import styles from "../../styles/Pagination.module.css";
import { ImageView } from "../imagePicker/ImageView";
import Button from "../button/Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedProductNames: string;
}

export default function Pagination(props: PaginationProps) {
  const { page, totalPages, onPageChange } = props;

  const [clicked, setClicked] = useState(1);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pages, setPages] = useState<(number | "...")[]>([]);

  const isPrevAvailable = currentPage > 1;
  const isNextAvailable = currentPage < totalPages;

  const processSinglePage = (pages: number[]) => {
    if (totalPages <= 6) {
      setPages(pages);
      return;
    }

    const pagesArr = pages;
    const middle = Math.floor(pagesArr.length / 2);
    const left = pagesArr.slice(0, middle);
    const right = pagesArr.slice(middle);

    if (pages.includes(currentPage)) {
      setPages([...left, "...", ...right]);
      return;
    }

    setPages([...left, currentPage, ...right]);
  };

  const processPages = () => {
    const pages = [];

    if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pages.push(i);

    if (totalPages > 5) {
      for (let i = 1; i <= 3; i++) pages.push(i);
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    processSinglePage(pages);
  };

  const handlePageChange = (page: number | "...") => {
    if (Number(page) < currentPage) {
      setClicked(0);
    } else {
      setClicked(1);
      props?.selectedProductNames &&
        alert(`You have successfully saved ${props?.selectedProductNames}`);
    }

    if (page === "...") return;

    processPages();
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrev = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  useEffect(() => {
    processPages();
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination_wrapper}>
      <div className={styles.wrapper}>
        <div
          className={cn(styles.left, {
            [styles.unavailable]: !isPrevAvailable,
          })}
          onClick={handlePrev}
        >
          <ImageView
            src={"./arrowLeft.svg"}
            alt={"arrow left"}
            fill={false}
            width={24}
            height={24}
            className={styles.arrowLeft}
            priority={true}
          />
        </div>
        <div className={styles.pages}>{`${currentPage}/${pages.length}`}</div>
        <div
          className={cn(styles.right, {
            [styles.unavailable]: !isNextAvailable,
          })}
          onClick={handleNext}
        >
          <ImageView
            src={"./arrowLeft.svg"}
            alt={"arrow right"}
            fill={false}
            width={24}
            height={24}
            className={styles.icon}
            priority={true}
          />
        </div>
      </div>

      <div className={styles.pagination_Btns}>
        <Button
          onClick={handlePrev}
          className={cn(styles.previousButton, {
            [styles.clicked]: !clicked,
            [styles.unavailable]: !isPrevAvailable,
          })}
          text={"Previous"}
          src={"./arrowLeft.svg"}
          alt={"arrow left"}
          width={24}
          height={24}
        />

        <Button
          onClick={handleNext}
          className={cn(styles.previousButton, {
            [styles.clicked]: clicked,
            [styles.unavailable]: !isNextAvailable,
          })}
          text={"Next"}
        />
      </div>
    </div>
  );
}
