import { useQuery } from "../context/QueryContext";

export default function SelectDDL() {
  const { allProduct, handleSelectProduct } = useQuery();

  return (
    <select onChange={handleSelectProduct}>
      <option
        key={`0|---select any product---`}
        value={`0|---select any product---`}
      >
        ---select any product---
      </option>
      {allProduct?.map((prod) => (
        <option
          key={`${prod.AssignmentID}|${prod.AssignmentName}`}
          value={`${prod.AssignmentID}|${prod.AssignmentName}`}
        >
          {prod.AssignmentName}
        </option>
      ))}
    </select>
  );
}
