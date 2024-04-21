import { CabinDataT, CabinParamT } from "../modules/cabins/type";
import supabase, { supabaseUrl } from "./supabase";

export async function fetchGetCabins(): Promise<CabinDataT[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function fetchCreateCabin(newCabin: CabinParamT) {
  if (!newCabin.image) return;
  const hasImagePath = typeof newCabin.image === "string";

  // 1. Create cabin
  const imageName = hasImagePath ? "" : `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();
  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}

export async function fetchUpdateCabin({ newCabin, id }: { newCabin: CabinParamT; id: number }) {
  const hasImagePath = typeof newCabin.image === "string";
  const imageName = `${Math.random()}-${(newCabin.image as File)?.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Update cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error("Cabin could not be updated");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}

export async function fetchDeleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
