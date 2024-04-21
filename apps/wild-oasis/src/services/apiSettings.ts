import { SettingT } from "../modules/settings/type";
import supabase from "./supabase";

export async function fetchGetSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function fetchUpdateSetting(newSetting: SettingT) {
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  const { data, error } = await supabase.from("settings").update(newSetting).eq("id", 1).select();
  if (error) {
    throw new Error("Settings could not be updated");
  }
  return data;
}
