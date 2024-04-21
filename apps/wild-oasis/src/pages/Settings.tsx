import Heading from "../components/Heading";
import Row from "../components/Row";
import SettingsForm from "../modules/settings/SettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <SettingsForm />
    </Row>
  );
}

export default Settings;
