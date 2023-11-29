import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data: cabins, error } = await supabase
		.from("cabins")
		.select("*");

	if (error) {
		console.error(error);
		throw new Error("ERROR LOADING CABINS");
	}

	return cabins;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath =
		newCabin.image?.startsWith?.(supabaseUrl);

	// CREATE IMAGE PATH
	const imageName = `${Math.random()}-${
		newCabin.image.name
	}`.replaceAll("/", "");

	// IF HAS IMAGE PATH THEN USE IT, ELSE USE NEWLY CREATED IMAGE PATH
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// QUERY
	let query = supabase.from("cabins");

	// CREATE
	if (!id) {
		query = query.insert([
			{ ...newCabin, image: imagePath },
		]);
	}

	// EDIT
	if (id) {
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("ERROR CREATING CABINS");
	}

	// IF CABIN ALREADY HAS IMAGE PATH NO NEED TO REUPLOAD THE IMAGE
	// WE RETURN THE DATA FROM HERE
	if (hasImagePath) return data;

	// UPLOAD IMAGE LOGIC
	// https://nfkwtcbqtysabrfszmdq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase
			.from("cabins")
			.delete()
			.eq("id", data.id);

		console.error(storageError);

		throw new Error(
			"ERROR UPLOADING CABIN IMAGE & CREATING THE CABIN"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data: cabin, error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("ERROR DELETING CABINS");
	}

	return cabin;
}
