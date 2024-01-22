import React from "react";
import ProductPicker from "@/components/ProductPicker/ProductPicker";
import { ImageView } from "@/components/imagePicker/ImageView";
import styles from "../styles/Page.module.css";

import { GetServerSideProps } from "next";

interface DesignStyle {
  id: string;
  name: string;
  createdAt: string;
  image: string;
}

interface JewelsProps {
  data: DesignStyle[];
}
const Jewels = (props: JewelsProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.hero_image_wrapper}>
        <ImageView
          src={"./hero.svg"}
          alt={"carousel"}
          fill={true}
          className={styles.hero_image}
          priority={true}
        />
      </div>
      <section className={styles.main}>
        <ProductPicker productData={props?.data} />
      </section>
    </main>
  );
};

export default Jewels;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(
      "https://6525210567cfb1e59ce6ae75.mockapi.io/api/v1/designstyles"
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    const data: DesignStyle[] = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        error: "Failed to fetch data",
      },
    };
  }
};
