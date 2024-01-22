import cn from "classnames";
import { ImageView } from "../imagePicker/ImageView";
import styles from "../../styles/ImageCard.module.css";

const ImageCard = ({ product, selectedProducts }: any) => {
  return (
    <div className={styles.imageCard_wrapper}>
      <div className={styles.imageWrapper}>
        <ImageView
          src={product?.image}
          alt={`product ${product?.id} image`}
          fill={false}
          width={142}
          height={142}
          className={cn(styles.image, {
            [styles.checkboxChecked]: selectedProducts?.includes(product?.id),
          })}
          priority={true}
        />
        { selectedProducts?.includes(product?.id) &&
          <ImageView
            src={"./Checkbox.svg"}
            alt={`Checkbox icon`}
            fill={false}
            width={20}
            height={20}
            className={styles.checkbox}
            priority={true}
          />
        }
      </div>
      <p className={styles.productName}>{product?.name}</p>
    </div>
  );
};

export default ImageCard;
