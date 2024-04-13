import { useFetcher } from "react-router-dom";
import { ButtonType } from "../../type";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={ButtonType.primary}>Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
