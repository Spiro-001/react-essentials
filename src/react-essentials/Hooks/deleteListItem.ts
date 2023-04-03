export function deleteListItem(
  event: any,
  manageList: React.Dispatch<React.SetStateAction<Record<number, string>>>,
  list: Record<number, string> | undefined
) {
  const selectedElement = parseInt(event.target.id);
  const currentListObject = structuredClone(list);
  delete currentListObject[selectedElement];
  manageList(currentListObject);
}
