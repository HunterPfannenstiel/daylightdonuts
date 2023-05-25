import { FunctionComponent } from "react";
import classes from "./CreateItemModal.module.css";
import useMenuModal from "@_hooks/admin/menu/useMenuModal";
import ItemDetails from "../../Reusable/ModifyMenuItem/ItemDetails";

interface CreateItemModalProps {}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = () => {
  const { itemDetails, updateItemDetails } = useMenuModal();
  return (
    <form>
      <ItemDetails
        image={itemDetails.image}
        name={itemDetails.name}
        price={itemDetails.price}
        description={itemDetails.description}
        updateHandler={updateItemDetails}
      />
    </form>
  );
};

export default CreateItemModal;
