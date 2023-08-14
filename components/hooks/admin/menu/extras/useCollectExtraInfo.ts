import { DisplayOrderItem, ExtraDetails } from "@_types/admin/modify-menu";
import useDetails from "../modification/useDetails";
import useSelectedId from "../modification/useSelectedId";
import useSelections, {
  InitialSelections,
} from "../modification/useSelections";

const useCollectExtraInfo = (
  initialDetails?: ExtraDetails,
  initialCategoryId?: number,
  initialGroups?: InitialSelections
) => {
  const { details, updateDetails, getUpdatedDetails } = useDetails(
    initialDetails || getInitialDetails()
  );

  const { selectedId, updateId, getUpdatedId } =
    useSelectedId(initialCategoryId);

  const updateCategoryId = (id: number) => {
    clearSelections();
    updateId(id);
  };
  const [selections, { updateSelection, clearSelections, composeSelections }] =
    useSelections(initialGroups);

  const getExtraGroupInfo = (
    extraSelections?: InitialSelections
  ): DisplayOrderItem[] => {
    return composeSelections((id) => {
      return { id, displayOrder: undefined };
    }, extraSelections);
  };

  const getExtraDetailsProps = ({ ...otherProps } = {}) => {
    return {
      initialDetails: details.current,
      updateHandler: updateDetails,
      ...otherProps,
    };
  };

  const getExtraGroupProps = ({ ...otherProps } = {}) => {
    return {
      initialGroups: selections,
      initialCategoryId: selectedId,
      updateCategory: updateCategoryId,
      updateGroupings: updateSelection,
      ...otherProps,
    };
  };

  return {
    extraDetails: details.current,
    getUpdatedDetails,
    selectedCategoryId: selectedId,
    selectedGroupingIds: selections,
    getExtraGroupInfo,
    getUpdatedId,
    getExtraDetailsProps,
    getExtraGroupProps,
  };
};

export default useCollectExtraInfo;

const getInitialDetails = (): ExtraDetails => {
  return {
    name: "",
    price: "",
    abbreviation: "",
  };
};
