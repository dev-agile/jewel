import React, { useState } from "react";
import styles from "../../styles/ProductPicker.module.css";
import { ImageView } from "../imagePicker/ImageView";
import ImageCard from "../imageCard/ImageCard";
import Button from "../button/Button";
import Footer from "../footer/Footer";

interface DesignStyle {
  id: string;
  name: string;
  createdAt: string;
  image: string;
}

interface ProductPickerProps {
  productData: DesignStyle[];
}

const ProductPicker = ({ productData }: ProductPickerProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const getSelectedProductNames = () => {
    return selectedProducts
      .map((productId) => {
        const product = productData.find(
          (product: any) => product.id === productId
        );
        return product ? product.name : "";
      })
      .filter((name) => name !== "")
      .join(", ");
  };

  return (
    <div className={styles.productPicker}>
      <div className={styles.main_body}>
        <ImageView
          src={"./AnanLogo.svg"}
          alt={"logo"}
          fill={false}
          width={103}
          height={73}
          className={styles.log}
          priority={true}
        />
        <header className={styles.header}>
          <section className={styles.headingWrapper}>
            <h2 className={styles.heading}>Pick your favourite products</h2>
            <p className={styles.subHeading}>Select upto 10 out of 100</p>
          </section>
          <Button className={styles.skip} text="Skip" />
        </header>

        <div className={styles.productFlex}>
          {productData.length &&
            productData.map((product: any) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => toggleProductSelection(product.id)}
              >
                <ImageCard
                  product={product}
                  selectedProducts={selectedProducts}
                />
              </div>
            ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Footer selectedProductNames={getSelectedProductNames()} />
      </footer>
    </div>
  );
};

export default ProductPicker;
