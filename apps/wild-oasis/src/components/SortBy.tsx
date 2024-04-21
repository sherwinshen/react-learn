import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }: { options: { label: string; value: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} type="white" value={sortBy} onChange={handleChange} />;
}

export default SortBy;
