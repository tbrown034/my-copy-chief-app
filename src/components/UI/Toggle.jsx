import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function MyToggle({ toggleTheme }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onClick={toggleTheme}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-gray-600" : "bg-gray-400"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
