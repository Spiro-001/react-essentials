export function deleteListItem(
  event: any,
  list: Record<number, string>,
  manageList?: React.Dispatch<React.SetStateAction<Record<number, string>>>
) {
  const selectedElement = parseInt(event.target.id);
  if (manageList) {
    const currentListObject = structuredClone(list);
    delete currentListObject[selectedElement];
    manageList(currentListObject);
  } else {
    delete list[selectedElement];
  }
}
