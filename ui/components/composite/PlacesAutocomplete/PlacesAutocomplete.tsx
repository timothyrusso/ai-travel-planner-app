import { colors } from "@/constants/style/colors";
import { dimensions } from "@/constants/style/dimensions";
import type { LocationInfo } from "@/modules/trip/domain/entities/LocationInfo";
import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

type PlacesAutocompleteProps = {
	onPress: (locationInfo: LocationInfo) => void;
	placeholder?: string;
};
const PlacesAutocomplete: FC<PlacesAutocompleteProps> = ({
	onPress,
	placeholder = "SEARCH_PLACE_PAGE.SEARCH_PLACE",
}) => {
	const { i18n, t } = useTranslation();
	const getLanguage = () => i18n.language;

	return (
		<GooglePlacesAutocomplete
			placeholder={t(placeholder)}
			fetchDetails={true}
			onPress={(data, details = null) => {
				console.log(details?.photos?.[0].photo_reference);
				onPress({
					name: data.description,
					coordinates: details?.geometry.location,
					// Use this to show photos of the places with photoRef e EXPO_PUBLIC_GOOGLE_PLACES_API_KEY: https://developers.google.com/maps/documentation/places/web-service/photos
					// @ts-ignore
					photoRef: details?.photos?.[0].photo_reference,
					url: details?.url,
				});
			}}
			query={{
				key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
				language: getLanguage ?? "en",
			}}
			styles={{
				textInputContainer: {
					height: dimensions.separator40 + dimensions.Single,
					borderWidth: dimensions.Minimal,
					borderColor: colors.primaryBlack,
					borderRadius: dimensions.Triple,
					overflow: "hidden",
					backgroundColor: colors.primaryWhite,
				},
			}}
			onFail={console.error}
		/>
	);
};

export default PlacesAutocomplete;
